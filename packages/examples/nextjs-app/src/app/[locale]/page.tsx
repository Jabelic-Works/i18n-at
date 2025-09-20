import { at } from "i18n-at";
import { messages, type AppLocale } from "@/messages";
import Dashboard from "@/components/Dashboard";
import Navigation from "@/components/Navigation";
import { I18nClientProvider } from "i18n-at/client";
import { getI18n } from "i18n-at/server";
import { i18nConfig } from "../../../i18nconfig";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  const { t, m } = getI18n(messages, locale, i18nConfig.interpolationFormat);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation locale={locale} />

      <main className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {t(m.dashboard.title)}
          </h1>

          <p className="text-lg text-gray-700 mb-8">
            {t(m.dashboard.welcome, { name: "Developer" })}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-blue-900 mb-2">
                Co-location Demo
              </h2>
              <p className="text-blue-700">
                Messages are defined right where they&apos;re used for easy
                maintenance.
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-green-900 mb-2">
                Type Safety
              </h2>
              <p className="text-green-700">
                Full TypeScript support with IDE code jumping.
              </p>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-purple-900 mb-2">
                Next.js Ready
              </h2>
              <p className="text-purple-700">
                Works with both server and client components.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Client Component Example
            </h2>
            <I18nClientProvider locale={locale}>
              <Dashboard />
            </I18nClientProvider>
          </div>
        </div>
      </main>
    </div>
  );
}
