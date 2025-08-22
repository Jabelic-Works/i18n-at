import type { Metadata } from "next";
import { I18nClientProvider } from "i18n-at/client";
import { type AppLocale } from "@/messages";

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
