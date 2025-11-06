'use client';

import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Tooltip,
  Menu,
  MenuItem,
} from '@mui/material';
import TranslateIcon from '@mui/icons-material/Translate';
import { useI18n } from '@/i18n/I18nProvider';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const { locale, setLocale, t } = useI18n();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const choose = (value: 'es' | 'en') => {
    setLocale(value);
    handleClose();
  };

  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{ borderBottom: '1px solid', borderColor: 'divider', backdropFilter: 'blur(6px)' }}
    >
      <Toolbar>
        <Box />
        <Toolbar sx={{ maxWidth: 'var(--page-max)', mx: 'auto', width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Link href="/about">
              <Image src="/icon-house.png" alt="Logo" width={50} height={50} />
            </Link>
            <Typography variant="h6" color="text.primary" sx={{ ml: 1, fontWeight: 700 }}>
              {t('app.title')}
            </Typography>
          </Box>

          <Box sx={{ flex: 1 }} />

          <Tooltip title="Cambiar idioma">
            <IconButton color="primary" aria-label="Cambiar idioma" onClick={handleOpen}>
              <TranslateIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
        <Menu
          color="in"
          id="lang-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem selected={locale === 'es'} onClick={() => choose('es')}>
            Español
          </MenuItem>
          <MenuItem selected={locale === 'en'} onClick={() => choose('en')}>
            English
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
