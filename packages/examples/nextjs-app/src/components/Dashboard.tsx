"use client";
import { useI18n, useLocale } from "i18n-at/client";
import { AppLocale, messages } from "@/messages";
import { useState } from "react";
import { i18nConfig } from "../../i18nconfig";

export default function Dashboard() {
  const locale = useLocale<AppLocale>();
  const { t, m } = useI18n(messages, i18nConfig.interpolationFormat);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
      <h3 className="text-xl font-semibold text-blue-900 mb-4">
        {t(m.dashboard.title)} - Client Component
      </h3>

      <p className="text-blue-700 mb-6">
        {t(m.dashboard.welcome, { name: "Client User" })}
      </p>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? t(m.common.loading) : t(m.common.save)}
          </button>

          <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">
            {t(m.common.cancel)}
          </button>
        </div>

        <div className="mt-6 p-4 bg-white rounded-md border">
          <h4 className="font-medium text-gray-900 mb-2">
            Current Locale: <span className="text-blue-600">{locale}</span>
          </h4>
          <p className="text-sm text-gray-600">
            This component uses useI18n() hook and useLocale() to get current
            locale. Try changing the URL to /ja or /zh to see different
            languages!
          </p>
        </div>
      </div>
    </div>
  );
}
