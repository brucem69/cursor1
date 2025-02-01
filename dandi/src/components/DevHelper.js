'use client';

import { useState, useEffect } from 'react';

export function DevHelper() {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // Ustawiamy szerokość dopiero po załadowaniu komponentu po stronie klienta
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="fixed bottom-0 right-0 bg-black/80 text-white p-2 text-sm z-50">
      <div className="sm:hidden">xs (&lt;640px)</div>
      <div className="hidden sm:block md:hidden">sm (≥640px)</div>
      <div className="hidden md:block lg:hidden">md (≥768px)</div>
      <div className="hidden lg:block xl:hidden">lg (≥1024px)</div>
      <div className="hidden xl:block 2xl:hidden">xl (≥1280px)</div>
      <div className="hidden 2xl:block">2xl (≥1536px)</div>
      <div className="mt-1">
        Width: {windowWidth}px
      </div>
    </div>
  );
} 