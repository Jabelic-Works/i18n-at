// lib/i18n/define-messages.ts
import type { Messages, MessageNode } from "./types";

// ジェネリックな defineMessages 関数
export function defineMessages<
  const T extends MessageNode,
  const TLocales extends string
>(messages: Messages<T, TLocales>) {
  return {
    messages,
  };
}

// 動的にロケールを指定
export const at = <
  TMessages extends Messages<MessageNode, string>,
  T extends keyof TMessages
>(
  locale: T,
  messages: TMessages
): TMessages[T] => {
  return messages[locale];
};
