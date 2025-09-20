"use client";
import { useContext } from "react";
import { MessageNode, Messages } from "./types";
import { getValueFromPath, interpolateMessage } from "./utils";
import {
  DEFAULT_INTERPOLATION_FORMAT,
  type InterpolationFormat,
} from "./config";
import { LocaleContext } from "./client-provider";
import { at } from "./define-messages";

export function useLocale<T extends string>(): T {
  const locale = useContext(LocaleContext);
  if (!locale) {
    throw new Error("useLocale must be used inside I18nClientProvider");
  }
  return locale as T;
}

export function useI18n<TMessages extends Messages<MessageNode, string>>(
  messages: TMessages,
  interpolationFormat: InterpolationFormat = DEFAULT_INTERPOLATION_FORMAT
) {
  const locale = useLocale() as keyof TMessages;

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
