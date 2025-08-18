import type { Metadata } from "next";
import { I18nClientProvider } from "i18n-at/client";
import { i18nConfig, type AppLocale } from "@/messages";
import { Geist, Geist_Mono } from "next/font/google";

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
    <>
      <I18nClientProvider locale={locale}>{children}</I18nClientProvider>
    </>
  );
}
