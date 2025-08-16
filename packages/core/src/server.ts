import type { MessageNode, TranslateFn } from "./types";
import { getValueFromPath } from "./utils";

export function getI18n<K extends string>(
  messages: Record<string, MessageNode>,
  locale: string
): TranslateFn<K> {
  return (key, params) => {
    const messageKey = typeof key === "string" ? key : String(key);
    let text = getValueFromPath(messages[locale], messageKey) ?? messageKey;

    if (params) {
      for (const [pKey, pValue] of Object.entries(params)) {
        text = text.replace(`{${pKey}}`, String(pValue));
      }
    }
    return text;
  };
}
