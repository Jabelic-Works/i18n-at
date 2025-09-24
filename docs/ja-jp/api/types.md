# 型定義

i18n-at の完全な型リファレンスです。

## コア型

### MessageNode

```typescript
interface MessageNode {
  [key: string]: string | MessageNode;
}
```

メッセージ構造のベースインターフェイスです。

### Messages

```typescript
type Messages<T extends MessageNode, TLocales extends string = string> = {
  [L in TLocales]: T;
};
```

複数のロケールにわたってメッセージを定義するための型です。

### TranslateFn

```typescript
type TranslateFn<K extends string = string> = (
  key: K | string,
  params?: Record<string, string | number>
) => string;
```

メッセージを翻訳するための関数型です。

### ExtractLocaleMessage

```typescript
type ExtractLocaleMessage<
  TMessages extends Messages<MessageNode, string>,
  TLocale extends string
> = TLocale extends keyof TMessages ? TMessages[TLocale] : never;
```

特定のロケールのメッセージ型を抽出します。

## 設定型

### LocaleConfig

```typescript
interface LocaleConfig {
  name: string;
  direction?: "ltr" | "rtl";
  dateFormat?: string;
}
```

単一ロケールの設定です。

### I18nConfig

```typescript
interface I18nConfig<TLocales extends Record<string, LocaleConfig>> {
  locales: TLocales;
  defaultLocale: keyof TLocales;
  fallbackLocale?: keyof TLocales;
  interpolationFormat?: InterpolationFormat;
}
```

完全な i18n 設定です。

### InterpolationFormat

```typescript
type InterpolationFormat = "none" | "intl" | "legacy" | "double";
```

サポートされている補間フォーマットです。

### ExtractLocales

```typescript
type ExtractLocales<T> = T extends I18nConfig<infer U> ? keyof U : never;
```

設定からロケールのユニオン型を抽出します。

### ExtractDefaultLocale

```typescript
type ExtractDefaultLocale<T> = T extends I18nConfig<infer U>
  ? T["defaultLocale"]
  : never;
```

設定からデフォルトロケールを抽出します。

### ExtractConfigLocales

```typescript
type ExtractConfigLocales<T> = T extends ReturnType<
  typeof defineI18nConfig<infer U extends Record<string, LocaleConfig>>
>
  ? keyof U
  : never;
```

`defineI18nConfig`の結果からロケールのユニオンを抽出します。

## 次のステップ

- [コア関数](/ja-jp/api/core-functions)を探る
- [サーバー関数](/ja-jp/api/server-functions)を学ぶ
- [クライアント関数](/ja-jp/api/client-functions)を理解する
