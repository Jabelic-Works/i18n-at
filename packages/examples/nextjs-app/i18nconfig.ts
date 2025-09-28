import { defineI18nConfig, ExtractConfigLocales } from "i18n-at";

export const i18nConfig = defineI18nConfig({
  locales: {
    "en-US": { name: "English" },
    "ja-JP": { name: "日本語" },
    "zh-CN": { name: "中文" },
  },
  defaultLocale: "en-US",
  interpolationFormat: "legacy",
});
