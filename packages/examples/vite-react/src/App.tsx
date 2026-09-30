import { useState } from "react";
import { defineMessages } from "i18n-at";
import { I18nClientProvider, useI18n, useLocale } from "i18n-at/client";

// Keep messages beside the component that uses them.
const { messages } = defineMessages({
  en: {
    title: "React works here, too",
    welcome: "Welcome, {name}!",
    description: "Switch languages without a router or server component.",
    currentLocale: "Current locale",
  },
  ja: {
    title: "React でも使えます",
    welcome: "{name} さん、ようこそ！",
    description: "ルーターや Server Component なしで言語を切り替えられます。",
    currentLocale: "現在の言語",
  },
});

type Locale = keyof typeof messages;

function Welcome() {
  const locale = useLocale<Locale>();
  const { t, m } = useI18n(messages);

  return (
    <section className="card">
      <p className="eyebrow">i18n-at / Vite + React</p>
      <h1>{t(m.title)}</h1>
      <p className="greeting">{t(m.welcome, { name: "React" })}</p>
      <p>{t(m.description)}</p>
      <p className="locale">
        {t(m.currentLocale)}: <code>{locale}</code>
      </p>
    </section>
  );
}

export default function App() {
  const [locale, setLocale] = useState<Locale>("en");

  return (
    <I18nClientProvider locale={locale}>
      <main>
        <nav aria-label="Language">
          <button
            type="button"
            aria-pressed={locale === "en"}
            onClick={() => setLocale("en")}
          >
            English
          </button>
          <button
            type="button"
            aria-pressed={locale === "ja"}
            onClick={() => setLocale("ja")}
          >
            日本語
          </button>
        </nav>
        <Welcome />
      </main>
    </I18nClientProvider>
  );
}
