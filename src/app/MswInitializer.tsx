"use client";

import { useEffect } from 'react';

export default function MswInitializer() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      import('@/mocks/browser').then(({ worker }) => {
        worker.start({
          serviceWorker: { url: '/mockServiceWorker.js' },
          onUnhandledRequest: 'bypass',
        });
      });
    }
  }, []);

  return null;
}
