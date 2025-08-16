import type { Metadata } from "next";
import { I18nClientProvider } from "i18n-at/client";
import { i18nConfig, type AppLocale } from "@/messages";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "i18n-at Example",
  description: "Type-safe internationalization with co-location example",
};

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
              >
         <I18nClientProvider locale={locale}>{children}</I18nClientProvider>
        </body>
    </html>
  );
}
