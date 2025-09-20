// === Core Configuration ===
export {
  defineI18nConfig,
  type LocaleConfig,
  type I18nConfig,
  type InterpolationFormat,
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

// === Environment-specific exports are available via subpaths:
// - Client: import from "i18n-at/client"
// - Server: import from "i18n-at/server"
