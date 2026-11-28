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
          {t(m.dashboard.title)} - {t(m.example.component)}
      </h3>

      <p className="text-blue-700 mb-6">
        {t(m.dashboard.welcome, { name: "Client User" })}
      </p>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleSave}
            disabled={isLoading}
            className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? t(m.common.loading) : t(m.common.save)}
          </button>

          <button
            type="button"
            className="cursor-pointer rounded-md bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
          >
            {t(m.common.cancel)}
          </button>
        </div>

        <div className="mt-6 p-4 bg-white rounded-md border">
          <h4 className="font-medium text-gray-900 mb-2">
            {t(m.example.currentLocale)} <span className="text-blue-600">{locale}</span>
          </h4>
          <p className="text-sm text-gray-600">
            {t(m.example.hint)}
          </p>
        </div>
      </div>
    </div>
  );
}
