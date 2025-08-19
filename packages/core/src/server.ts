import { at } from "./define-messages";
import type { MessageNode, Messages, TranslateFn } from "./types";
import { getValueFromPath } from "./utils";

export function getI18n<TMessages extends Messages<MessageNode, string>>(
  messages: TMessages,
  locale: keyof TMessages
) {
  const t = (key: string, params?: Record<string, string | number>): string => {
    const messageKey = typeof key === "string" ? key : String(key);
    let text = getValueFromPath(messages[locale], messageKey) ?? messageKey;

    if (params) {
      for (const [pKey, pValue] of Object.entries(params)) {
        text = text.replace(`{${pKey}}`, String(pValue));
      }
    }
    return text;
  };

  const m = at(locale, messages);

  return { t, m };
}
