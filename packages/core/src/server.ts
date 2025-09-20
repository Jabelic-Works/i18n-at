import { at } from "./define-messages";
import type { MessageNode, Messages } from "./types";
import { getValueFromPath, interpolateMessage } from "./utils";
import {
  DEFAULT_INTERPOLATION_FORMAT,
  type InterpolationFormat,
} from "./config";

// Config対応版のgetI18n
export function getI18n<TMessages extends Messages<MessageNode, string>>(
  messages: TMessages,
  locale: keyof TMessages,
  interpolationFormat: InterpolationFormat = DEFAULT_INTERPOLATION_FORMAT
) {
  const t = (key: string, params?: Record<string, string | number>): string => {
    const messageKey = typeof key === "string" ? key : String(key);
    let text = getValueFromPath(messages[locale], messageKey) ?? messageKey;

    if (params) {
      text = interpolateMessage(text, params, interpolationFormat);
    }
    return text;
  };

  const m = at(locale, messages);

  return { t, m };
}
