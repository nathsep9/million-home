"use client";

import { useEffect, useMemo, useState, startTransition } from 'react';
import Link from 'next/link';
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, InputAdornment, Slider, Stack, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import type { PropertyDTO, PropertiesResponse } from '@/app/interface/types/property';
import { useI18n } from '@/i18n/I18nProvider';
import TabsNav from '../TabsNav';

const fetchProperties = async (params: URLSearchParams): Promise<PropertiesResponse> => {
  const res = await fetch(`/api/properties?${params.toString()}`);
  if (!res.ok) throw new Error('Error fetching properties');
  return res.json();
};

export default function PropertiesBuyPage() {
  const { t } = useI18n();
  const [items, setItems] = useState<PropertyDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000000]);

  const params = useMemo(() => {
    const sp = new URLSearchParams();
    if (name) sp.set('name', name);
    if (address) sp.set('address', address);
    if (priceRange[0] > 0) sp.set('minPrice', String(priceRange[0]));
    if (priceRange[1] < 1000000) sp.set('maxPrice', String(priceRange[1]));
    return sp;
  }, [name, address, priceRange]);

  useEffect(() => {
    let ignore = false;
    (async () => {
      await Promise.resolve();
      if (!ignore) startTransition(() => setLoading(true));
      if (!ignore) setError(null);
      try {
        const data = await fetchProperties(params);
        if (!ignore) setItems(data.items);
      } catch (e) {
        const message = e instanceof Error ? e.message : 'Unknown error';
        if (!ignore) setError(message);
      } finally {
        if (!ignore) startTransition(() => setLoading(false));
      }
    })();
    return () => {
      ignore = true;
    };
  }, [params]);

  return (
    <main className="container">
      <Stack spacing={3}>
        <Typography variant="h4">{t('nav.properties')}</Typography>
        <TabsNav />

        <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'background.paper' }}>
          <Stack spacing={2}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                fullWidth
                label={t('filters.name')}
                value={name}
                onChange={(e) => setName(e.target.value)}
                InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
              />
              <TextField
                fullWidth
                label={t('filters.address')}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
              />
            </Stack>
            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>{t('filters.priceRange')}</Typography>
              <Slider
                value={priceRange}
                onChange={(_, v) => setPriceRange(v as number[])}
                valueLabelDisplay="auto"
                min={0}
                max={1000000}
                step={10000}
              />
              <Stack direction="row" justifyContent="space-between">
                <Stack direction="row" spacing={1} alignItems="center">
                  <AttachMoneyIcon fontSize="small" />
                  <Typography variant="caption">{priceRange[0].toLocaleString()}</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <AttachMoneyIcon fontSize="small" />
                  <Typography variant="caption">{priceRange[1].toLocaleString()}</Typography>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Box>

        {error && <Typography color="error">{error}</Typography>}
        {loading && <Typography>{t('list.loading')}</Typography>}

        {/* Grid */}
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' } }}>
          {items.map((p) => (
            <Box key={p.id}>
              <Card sx={{ height: '100%' }}>
                <CardActionArea component={Link} href={`/buy/${p.id}`}>
                  <CardMedia component="img" height={180} image={p.imageUrl} alt={p.name} />
                  <CardContent>
                    <Typography variant="h6">{p.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{p.address}</Typography>
                    <Typography sx={{ mt: 1 }} fontWeight={700}>${p.price.toLocaleString()}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
          ))}
        </Box>

        {!loading && items.length === 0 && (
          <Stack alignItems="center" sx={{ opacity: 0.7 }}>
            <Typography>{t('list.noResults')}</Typography>
            <Button component={Link} href="/" sx={{ mt: 1 }}>{t('detail.back')}</Button>
          </Stack>
        )}
      </Stack>
    </main>
  );
}
