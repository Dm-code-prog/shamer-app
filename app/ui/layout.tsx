import { NavigationMenu } from '#/components/ui/navigation-menu';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <NavigationMenu />
    </>
  );
}
