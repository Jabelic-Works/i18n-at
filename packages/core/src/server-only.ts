// === Core Configuration ===
export {
  defineI18nConfig,
  type LocaleConfig,
  type I18nConfig,
  type ExtractLocales,
  type ExtractDefaultLocale,
  type ExtractConfigLocales,
} from "./config";

// === Types ===
export {
  type MessageNode,
  type Messages,
  type ExtractLocaleMessage,
  type TranslateFn,
} from "./types";

// === Message Definition ===
export { defineMessages, at } from "./define-messages";

// === Server-Side ===
export { getI18n } from "./server";
