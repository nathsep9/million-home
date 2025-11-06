"use client";

import { useEffect, useState } from 'react';
import { useI18n } from '@/i18n/I18nProvider';
import { useParams } from 'next/navigation';
import { Box, Button, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import type { PropertyDTO } from '@/app/interface/types/property';

export default function BuyPropertyDetailPage() {
  const { t } = useI18n();
  const params = useParams<{ id: string }>();
  const id = params?.id as string;
  const [item, setItem] = useState<PropertyDTO | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect( () => {
    if (!id) return;
    let ignore = false;
    (async () => {
      await fetch(`/api/properties/${id}`)
        .then((res) => (res.ok ? res.json() : Promise.reject(new Error('No encontrado'))))
        .then((data) => !ignore && setItem(data))
        .catch((e) => !ignore && setError(e.message));
    })();
    return () => { ignore = true; };
  }, [id]);

  if (error) {
    return (
      <main className="container">
        <Typography color="error">{error}</Typography>
        <Button component={Link} href="/buy" sx={{ mt: 2 }}>{t('detail.back')}</Button>
      </main>
    );
  }

  if (!item) return <main className="container"><Typography>{t('list.loading')}</Typography></main>;

  return (
    <main className="container">
      <Stack spacing={2}>
        <Button component={Link} href="/buy">{t('detail.back')}</Button>
        <Card>
          <CardMedia component="img" height={340} image={item.imageUrl} alt={item.name} />
          <CardContent>
            <Typography variant="h4">{item.name}</Typography>
            <Typography color="text.secondary">{item.address}</Typography>
            <Box sx={{ mt: 1 }}>
              <Typography fontWeight={700}>${item.price.toLocaleString()}</Typography>
              <Typography variant="caption">{t('detail.owner')}: {item.idOwner}</Typography>
            </Box>
          </CardContent>
        </Card>
      </Stack>
    </main>
  );
}
