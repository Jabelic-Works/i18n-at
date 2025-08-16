import { createContext } from "react";

// Localeのみを管理するContext（ジェネリック版）
export const LocaleContext = createContext<string | null>(null);

export function I18nClientProvider({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
}
