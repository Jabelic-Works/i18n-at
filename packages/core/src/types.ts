// メッセージ構造の基本型
export interface MessageNode {
  [key: string]: string | MessageNode;
}

// メッセージ定義の型（ジェネリックバージョン）
export type Messages<
  T extends MessageNode,
  TLocales extends string = string
> = {
  [L in TLocales]: T;
};

// メッセージオブジェクトから型レベルでロケールのメッセージを抽出
export type ExtractLocaleMessage<
  TMessages extends Messages<MessageNode, string>,
  TLocale extends string
> = TLocale extends keyof TMessages ? TMessages[TLocale] : never;

// t関数の型
export type TranslateFn<K extends string = string> = (
  key: K | string,
  params?: Record<string, string | number>
) => string;
