import { I18nClientProvider } from "i18n-at/client";
import { messages, type AppLocale } from "@/messages";
import { notFound } from "next/navigation";

function isAppLocale(locale: string): locale is AppLocale {
  return Object.prototype.hasOwnProperty.call(messages, locale);
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  // Next の `LayoutProps` は params を `string` 扱いにするため、ここで絞り込む
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isAppLocale(locale)) notFound();
  return (
    <>
      <I18nClientProvider locale={locale}>{children}</I18nClientProvider>
    </>
  );
}
