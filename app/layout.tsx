import '#/styles/globals.css';
import { Metadata } from 'next';
import { ShamerLogo } from '#/components/ui/shamer-logo';
import React from 'react';
import { ToastContainer } from '#/app/ui/toast';

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
  return (
    <html lang="en" className="[color-scheme:dark]">
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://telegram.org/js/telegram-web-app.js"></script>
        <title>Shamer app</title>
      </head>
      <body className="bg-background flex flex-col items-center">
        <div className="w-full max-w-[420px]">
          <div className="my-auto flex  h-screen flex-col items-center justify-start gap-8 p-8 pb-16">
            {children}
          </div>
        </div>
        <ToastContainer />
      </body>
    </html>
  );
}
