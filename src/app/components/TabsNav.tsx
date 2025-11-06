"use client";

import { Tab, Tabs } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { useI18n } from '@/i18n/I18nProvider';

export default function TabsNav() {
  const { t } = useI18n();
  const router = useRouter();
  const pathname = usePathname();

  const value = pathname?.startsWith('/buy') ? 1 : 0;

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    router.push(newValue === 1 ? '/buy' : '/about');
  };

  return (
    <Tabs value={value} onChange={handleChange} aria-label="sections">
      <Tab label={t('home.aboutTab')} />
      <Tab label={t('home.buyTab')} />
    </Tabs>
  );
}
