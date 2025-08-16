"use client";
import { createContext, useContext } from "react";
import { MessageNode } from "./types";
import { getValueFromPath } from "./utils";
import { LocaleContext } from "./client-provider";

export function useLocale<T extends string>(): T {
  const locale = useContext(LocaleContext);
  if (!locale) {
    throw new Error("useLocale must be used inside I18nClientProvider");
  }
  return locale as T;
}

// 各コンポーネントが独立してmessagesを使用するためのフック
export function useI18n<T extends Record<string, MessageNode>>(messages: T) {
  const locale = useLocale();

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

  return { t };
}
