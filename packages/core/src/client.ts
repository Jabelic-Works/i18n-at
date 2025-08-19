"use client";
import { useContext } from "react";
import { MessageNode, Messages } from "./types";
import { getValueFromPath } from "./utils";
import { LocaleContext } from "./client-provider";
import { at } from "./define-messages";

export function useLocale<T extends string>(): T {
  const locale = useContext(LocaleContext);
  if (!locale) {
    throw new Error("useLocale must be used inside I18nClientProvider");
  }
  return locale as T;
}

// 各コンポーネントが独立してmessagesを使用するためのフック
export function useI18n<TMessages extends Messages<MessageNode, string>>(
  messages: TMessages
) {
  const locale = useLocale() as keyof TMessages;

  const t = (key: string, params?: Record<string, string | number>): string => {
    // keyがオブジェクトの場合は値を抽出
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
