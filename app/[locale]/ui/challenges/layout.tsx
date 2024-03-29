import { Header } from '#/components/compound/header';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header withBackNavigation />
      {children}
    </>
  );
}
