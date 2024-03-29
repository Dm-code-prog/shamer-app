import '#/styles/globals.css';
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Shamer',
    template: '%s | Shamer',
  },
  description:
    'Shamer: Ignite your fitness journey with playful nudges and tough love. Celebrate progress, push limits, and remember—respect comes with dedication. Because, in the end, yes, you can. #RespectThroughChallenge"',
  openGraph: {
    title: 'Next.js App Router Playground',
    description:
      'Shamer: Ignite your fitness journey with playful nudges and tough love. Celebrate progress, push limits, and remember—respect comes with dedication. Because, in the end, yes, you can. #RespectThroughChallenge',
    images: [`/api/og?title=Next.js App Router`],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
