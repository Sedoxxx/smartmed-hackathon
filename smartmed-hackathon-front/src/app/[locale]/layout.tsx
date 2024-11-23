import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import '@mantine/core/styles.css';
import { HeaderMenu } from "@/components/HeaderMenu/HeaderMenu";
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { get } from "http";
import {routing} from '@/i18n/routing';
import {NextIntlClientProvider} from 'next-intl';
import {getLocale, getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string};
}>) {
  // const locale = await getLocale();
  const messages = await getMessages();

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>

        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          
          
          <MantineProvider>
          
          <NextIntlClientProvider messages={messages}>
            <HeaderMenu />
            {children}
          </NextIntlClientProvider>
          </MantineProvider>
        </body>

    </html>
  );
}
