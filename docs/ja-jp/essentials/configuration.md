# 設定

`defineI18nConfig`を使用してアプリケーションの国際化設定を構成する方法を学びます。

## 基本設定

`defineI18nConfig`を使用してアプリケーションの国際化設定を定義します：

```typescript
// i18nconfig.ts
import { defineI18nConfig } from "i18n-at";

export const i18nConfig = defineI18nConfig({
  locales: {
    "en-US": { name: "English" },
    "ja-JP": { name: "日本語" },
    "zh-CN": { name: "中文" },
  },
  defaultLocale: "en-US",
});
```

## 設定オプション

### locales

サポートするロケールとその設定を定義します：

```typescript
export const i18nConfig = defineI18nConfig({
  locales: {
    "en-US": {
      name: "English",
    },
    "ja-JP": {
      name: "日本語",
    },
    "ar-SA": {
      name: "العربية",
    },
  },
  defaultLocale: "en-US",
});
```

#### LocaleConfig プロパティ

- `name` (必須)：ロケールの表示名
- `direction` (オプション)：テキストの方向 - `"ltr"`または`"rtl"`、デフォルトは`"ltr"`

### defaultLocale

デフォルトとして使用するロケールを指定します：

```typescript
export const i18nConfig = defineI18nConfig({
  locales: {
    en: { name: "English" },
    ja: { name: "日本語" },
  },
  defaultLocale: "en", // ロケールキーの1つである必要があります
});
```

### fallbackLocale

要求されたロケールが利用できない場合のフォールバックロケールを指定します：

```typescript
export const i18nConfig = defineI18nConfig({
  locales: {
    en: { name: "English" },
    ja: { name: "日本語" },
    zh: { name: "中文" },
  },
  defaultLocale: "en",
  fallbackLocale: "en", // ロケールが見つからない場合は英語にフォールバック
});
```

### interpolationFormat

メッセージ変数の補間フォーマットを設定します：

```typescript
export const i18nConfig = defineI18nConfig({
  locales: {
    en: { name: "English" },
    ja: { name: "日本語" },
  },
  defaultLocale: "en",
  interpolationFormat: "legacy", // デフォルト: "legacy"
});
```

#### 補間フォーマット

- `"legacy"`: `{name}` - 従来のフォーマット
- `"intl"`: `{$name}` - 現在の i18n-at フォーマット（推奨）
- `"double"`: `{{name}}` - ダブルブレースフォーマット
- `"none"`: 補間サポートなし

## 生成されるプロパティ

`defineI18nConfig`は自動的に有用なプロパティを生成します：

```typescript
export const i18nConfig = defineI18nConfig({
  locales: {
    en: { name: "English" },
    ja: { name: "日本語" },
  },
  defaultLocale: "en",
});

// 生成されるプロパティ:
i18nConfig.localeKeys; // ["en", "ja"]
i18nConfig.isValidLocale("en"); // true
i18nConfig.isValidLocale("fr"); // false
i18nConfig.getLocaleConfig("en"); // { name: "English" }
```

### localeKeys

定義されたすべてのロケールキーの配列：

```typescript
const supportedLocales = i18nConfig.localeKeys;
// ["en-US", "ja-JP", "zh-CN"]
```

### isValidLocale

ロケールがサポートされているかをチェックする型ガード関数：

```typescript
function handleLocale(locale: string) {
  if (i18nConfig.isValidLocale(locale)) {
    // ここでTypeScriptはlocaleが有効であることを認識
    const config = i18nConfig.getLocaleConfig(locale);
    console.log(`Using ${config.name}`);
  } else {
    // サポートされていないロケールの処理
    console.log("Locale not supported");
  }
}
```

### getLocaleConfig

特定のロケールの設定を取得：

```typescript
const enConfig = i18nConfig.getLocaleConfig("en-US");
// { name: "English", direction: "ltr" }
```

## 型安全性

設定は完全な型安全性を提供します：

```typescript
// ロケール型を抽出
type SupportedLocale = ExtractConfigLocales<typeof i18nConfig>;
// "en-US" | "ja-JP" | "zh-CN"

// 関数パラメータで使用
function translate(locale: SupportedLocale, key: string) {
  // 実装
}

// TypeScriptが有効なロケールを強制
translate("en-US", "welcome"); // ✅ 有効
translate("fr-FR", "welcome"); // ❌ TypeScriptエラー
```

## Next.js との統合

設定を Next.js ルーティングと組み合わせて使用：

```typescript
// next.config.js
import { i18nConfig } from "./i18nconfig";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // すべてのロケール用の静的ページを生成
  generateStaticParams: () =>
    i18nConfig.localeKeys.map((locale) => ({ locale })),
};

export default nextConfig;
```

## ベストプラクティス

1. **設定を一元化** - すべての i18n 設定を 1 か所にまとめる
2. **意味のあるロケールコードを使用** - 必要に応じて`"en-US"`vs`"en"`
3. **フォールバックを設定** - 常にフォールバックロケールを設定
4. **型安全性を活用** - 生成された型をアプリケーションで使用

## 例：完全なセットアップ

```typescript
// i18nconfig.ts
import { defineI18nConfig } from "i18n-at";

export const i18nConfig = defineI18nConfig({
  locales: {
    en: {
      name: "English",
    },
    ja: {
      name: "日本語",
    },
    ar: {
      name: "العربية",
    },
  },
  defaultLocale: "en",
  fallbackLocale: "en",
  interpolationFormat: "intl",
});

// アプリ全体で使用するための型をエクスポート
export type AppLocale = ExtractConfigLocales<typeof i18nConfig>;
export type AppLocaleConfig = (typeof i18nConfig.locales)[AppLocale];
```

## 次のステップ

- [メッセージフォーマット構文](/ja-jp/essentials/message-format-syntax)を学ぶ
- [TypeScript サポート](/ja-jp/advanced/typescript-support)を探る
