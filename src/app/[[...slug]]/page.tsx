'use client';

import dynamic from 'next/dynamic';

// Dynamically load the React Router SPA to avoid SSR issues with `window` or `document`
const SpaApp = dynamic(() => import('../App'), { ssr: false });

export default function CatchAllPage() {
  return <SpaApp />;
}
