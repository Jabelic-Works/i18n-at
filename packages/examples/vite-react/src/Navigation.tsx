import { useI18n } from "i18n-at/client";
import { messages, type AppLocale } from "./messages";

export default function Navigation({ locale }: { locale: AppLocale }) {
  const { t, m } = useI18n(messages);

  return (
    <nav className="border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-4xl px-6">
        <div className="flex min-h-16 flex-wrap items-center justify-between gap-3 py-2">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">
              {t(m.navigation.brand)}
            </h1>
            <span className="ml-3 rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
              Vite + React
            </span>
          </div>

          <div className="flex items-center space-x-8">
            <a
              href={"?locale=" + locale}
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              {t(m.navigation.home)}
            </a>
            <span className="cursor-not-allowed rounded-md px-3 py-2 text-sm font-medium text-gray-700 opacity-50">
              {t(m.navigation.about)}
            </span>
            <span className="cursor-not-allowed rounded-md px-3 py-2 text-sm font-medium text-gray-700 opacity-50">
              {t(m.navigation.contact)}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {t(m.navigation.language)}
            </span>
            <div className="flex items-center space-x-1">
              {(Object.keys(messages) as AppLocale[]).map((loc) => (
                <a
                  key={loc}
                  href={"?locale=" + loc}
                  aria-current={locale === loc ? "page" : undefined}
                  className={
                    "rounded px-2 py-1 text-xs font-medium " +
                    (locale === loc
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100")
                  }
                >
                  {loc.toUpperCase()}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
