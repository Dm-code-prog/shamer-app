import '#/styles/globals.css';
import React from 'react';
import { ToastContainer } from '#/app/[locale]/ui/toast';
import { NavigationMenu } from '#/components/compound/navigation-menu';

import Script from 'next/script';

import { Bebas_Neue, Russo_One, Oswald } from 'next/font/google';
import { cn } from '#/styles/utils';
import initTranslations from '#/app/i18n';
import TranslationsProvider from '#/components/TranslationsProvider';

const cyrillicFont = Oswald({
  weight: '400',
  display: 'swap',
  subsets: ['cyrillic', 'latin'],
});

const bebasNeue = Bebas_Neue({
  weight: '400',
  display: 'swap',
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const font = locale === 'ru' ? cyrillicFont : bebasNeue;
  const defaultFontSize = locale === 'ru' ? 'text-[14px]' : 'text-base';

  const { t, resources } = await initTranslations(locale, ['navigation']);
  return (
    <html lang={locale} className={cn(font.className, defaultFontSize)}>
      <head>
        <Script src="https://telegram.org/js/telegram-web-app.js"></Script>
        <title>Shamer app</title>
      </head>
      <body className="bg-background flex flex-col items-center">
        <div className="w-full max-w-[420px]">
          <div className=" flex min-h-screen flex-col items-center justify-start gap-8 p-8 pb-16">
            {children}
            <TranslationsProvider
              namespaces={['navigation']}
              locale={locale}
              resources={resources}
            >
              <NavigationMenu />
            </TranslationsProvider>
          </div>
        </div>
        <ToastContainer />
      </body>
    </html>
  );
}
