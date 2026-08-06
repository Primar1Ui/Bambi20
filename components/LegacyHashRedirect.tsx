'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { legacyHashRoutes } from '@/lib/navigation';

/** Redirects old `/#section` bookmarks to dedicated routes on the homepage. */
export default function LegacyHashRedirect() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    const target = legacyHashRoutes[hash];
    if (target) {
      router.replace(target);
    }
  }, [router]);

  return null;
}
