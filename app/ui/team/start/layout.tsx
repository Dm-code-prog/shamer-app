import React from 'react';
import { ShamerLogo } from '#/components/ui/shamer-logo';
import { BackNavigation } from '#/components/ui/back-navigation';
import { Header } from '#/components/ui/header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header withBackNavigation withLogo />
      {children}
    </>
  );
}
