"use client";

import { useEffect, useMemo, useState, startTransition } from 'react';
import Link from 'next/link';
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, InputAdornment, Slider, Stack, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import type { PropertyDTO, PropertiesResponse } from '@/app/interface/types/property';
import { useI18n } from '@/i18n/I18nProvider';
import TabsNav from '@/app/components/TabsNav';

const fetchProperties = async (params: URLSearchParams): Promise<PropertiesResponse> => {
  const res = await fetch(`/api/properties?${params.toString()}`);
  if (!res.ok) throw new Error('Error fetching properties');
  return res.json();
};

function useDebounce<T>(value: T, delay = 700) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

export default function BuyPage() {
  const { t } = useI18n();
  const [items, setItems] = useState<PropertyDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      setMswReady(true);
      return;
    }
    const ready = () => setMswReady(true);
    if (window.__MSW_READY) ready();
    else if (window.__MSW_STARTING) window.__MSW_STARTING.then(ready);
    else ready();
  }, []);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000000]);

  const debouncedName = useDebounce(name);
  const debouncedAddress = useDebounce(address);

  const params = useMemo(() => {
    const sp = new URLSearchParams();
    if (debouncedName) sp.set('name', debouncedName);
    if (debouncedAddress) sp.set('address', debouncedAddress);
    if (priceRange[0] > 0) sp.set('minPrice', String(priceRange[0]));
    if (priceRange[1] < 1000000) sp.set('maxPrice', String(priceRange[1]));
    return sp;
  }, [debouncedName, debouncedAddress, priceRange]);

  useEffect(() => {
    if (!mswReady) return;
    console.log('mswReady', mswReady);
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
  }, [params, mswReady]);

  return (
    <main className="container">
      <Stack spacing={3}>
        <TabsNav />
        <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'background.paper' }}>
          <Stack spacing={2}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                color='secondary'
                fullWidth
                label={t('filters.name')}
                value={name}
                onChange={(e) => setName(e.target.value)}
                InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
              />
              <TextField
                color='secondary'
                fullWidth
                label={t('filters.address')}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
              />
            </Stack>
            <Box>
              <Typography variant="body2" sx={{ mb: 1 }} color='secondary'>{t('filters.priceRange')}</Typography>
              <Slider
                value={priceRange}
                onChange={(_, v) => setPriceRange(v as number[])}
                valueLabelDisplay="auto"
                min={0}
                max={1000000}
                step={10000}
                color='secondary'
              />
              <Stack direction="row" justifyContent="space-between">
                <Stack direction="row" spacing={1} alignItems="center">
                  <AttachMoneyIcon fontSize="small" color='secondary' />
                  <Typography variant="caption" color='secondary'>{priceRange[0].toLocaleString()}</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <AttachMoneyIcon fontSize="small" color='secondary' />
                  <Typography variant="caption" color='secondary'>{priceRange[1].toLocaleString()}</Typography>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Box>

        {error && <Typography color="error">{error}</Typography>}
        {loading && <Typography>{t('list.loading')}</Typography>}

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
