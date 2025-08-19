import { at } from "i18n-at";
import { getI18n } from "i18n-at/server";
import { messages, i18nConfig, type AppLocale } from "@/messages";
import Link from "next/link";

interface NavigationProps {
  locale: AppLocale;
}

export default function Navigation({ locale }: NavigationProps) {
  const { t, m } = getI18n(messages, locale);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Title */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">i18n-at Example</h1>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <Link
              href={`/${locale}`}
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              {t(m.navigation.home)}
            </Link>
            <span className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium cursor-not-allowed opacity-50">
              {t(m.navigation.about)}
            </span>
            <span className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium cursor-not-allowed opacity-50">
              {t(m.navigation.contact)}
            </span>
          </div>

          {/* Language Selector */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Language:</span>
            <div className="flex items-center space-x-1">
              {i18nConfig.locales.map((loc) => (
                <Link
                  key={loc}
                  href={`/${loc}`}
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    locale === loc
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {loc.toUpperCase()}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
