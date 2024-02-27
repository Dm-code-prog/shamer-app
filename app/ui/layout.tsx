import { NavigationMenu } from '#/components/compound/navigation-menu';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <NavigationMenu />
    </>
  );
}
