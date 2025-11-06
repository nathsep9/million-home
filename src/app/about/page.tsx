'use client';

import { Box, Button, Stack, Typography } from '@mui/material';
import { useI18n } from '@/i18n/I18nProvider';
import Link from 'next/link';
import Image from 'next/image';

import TabsNav from '@/app/components/TabsNav';

export default function AboutPage() {
  const { t } = useI18n();
  return (
    <main className="container">
      <Stack spacing={3}>
        <TabsNav />
        <Box
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 3,
            background: 'linear-gradient(135deg,#6a5cff, #b06afc)',
            color: '#fff',
            overflow: 'hidden',
          }}
        >
          <Stack spacing={2} maxWidth={720}>
            <Typography variant="overline" sx={{ opacity: 0.85 }}>
              {t('home.hero.kicker') ?? ' '}
            </Typography>
            <Typography variant="h3" fontWeight={800}>
              {t('home.hero.title')}
            </Typography>
            <Typography sx={{ opacity: 0.9 }}>{t('home.hero.subtitle')}</Typography>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              alignItems={{ xs: 'stretch', sm: 'center' }}
            >
              <Button component={Link} href="/buy" variant="contained" color="secondary">
                {t('home.hero.cta')}
              </Button>
            </Stack>
          </Stack>
        </Box>
        <div style={{ textAlign: 'center' }}>
          <Image src="/for-sale.jpg" alt="Logo" width={700} height={400} />
        </div>
      </Stack>
    </main>
  );
}
