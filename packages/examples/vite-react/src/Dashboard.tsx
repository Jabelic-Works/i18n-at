import { useState } from "react";
import { useI18n, useLocale } from "i18n-at/client";
import { messages, type AppLocale } from "./messages";

export default function Dashboard() {
  const locale = useLocale<AppLocale>();
  const { t, m } = useI18n(messages);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
      <h3 className="mb-4 text-xl font-semibold text-blue-900">
        {t(m.dashboard.title)} - {t(m.example.component)}
      </h3>

      <p className="mb-6 text-blue-700">
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

        <div className="mt-6 rounded-md border border-gray-200 bg-white p-4">
          <h4 className="mb-2 font-medium text-gray-900">
            {t(m.example.currentLocale)}{" "}
            <span className="text-blue-600">{locale}</span>
          </h4>
          <p className="text-sm text-gray-600">{t(m.example.hint)}</p>
        </div>
      </div>
    </div>
  );
}
