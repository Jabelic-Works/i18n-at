import { useEffect } from "react";
import { I18nClientProvider, useI18n } from "i18n-at/client";
import Dashboard from "./Dashboard";
import Navigation from "./Navigation";
import { isAppLocale, messages, type AppLocale } from "./messages";

const requestedLocale = new URLSearchParams(window.location.search).get("locale");
const locale: AppLocale =
  requestedLocale && isAppLocale(requestedLocale) ? requestedLocale : "en-US";

function PageContent() {
  const { t, m } = useI18n(messages);

  return (
    <div lang={locale} className="min-h-screen bg-gray-50">
      <Navigation locale={locale} />

      <main className="mx-auto max-w-4xl p-6">
        <div className="rounded-lg bg-white p-8 shadow-md">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            {t(m.dashboard.title)}
          </h1>

          <p className="mb-8 text-lg text-gray-700">
            {t(m.dashboard.welcome, { name: "Developer" })}
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-blue-50 p-6">
              <h2 className="mb-2 text-xl font-semibold text-blue-900">
                {t(m.features.colocation.title)}
              </h2>
              <p className="text-blue-700">
                {t(m.features.colocation.description)}
              </p>
            </div>

            <div className="rounded-lg bg-green-50 p-6">
              <h2 className="mb-2 text-xl font-semibold text-green-900">
                {t(m.features.typeSafety.title)}
              </h2>
              <p className="text-green-700">
                {t(m.features.typeSafety.description)}
              </p>
            </div>

            <div className="rounded-lg bg-purple-50 p-6">
              <h2 className="mb-2 text-xl font-semibold text-purple-900">
                {t(m.features.react.title)}
              </h2>
              <p className="text-purple-700">
                {t(m.features.react.description)}
              </p>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              {t(m.example.heading)}
            </h2>
            <Dashboard />
          </div>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <I18nClientProvider locale={locale}>
      <PageContent />
    </I18nClientProvider>
  );
}
