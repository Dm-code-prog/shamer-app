import '#/styles/globals.css';
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
  return (
    <html lang="en" className="[color-scheme:light]">
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://telegram.org/js/telegram-web-app.js"></script>
        <title>Shamer app</title>
      </head>
      <body className="flex flex-col items-center">
        <div className="w-full max-w-[500px] bg-white p-8">{children}</div>
      </body>
    </html>
  );
}
