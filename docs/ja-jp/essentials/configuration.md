# 設定

## 型安全なロケール定義

`defineI18nConfig`は型安全なロケール設定を作成するヘルパー関数です。**注意：これは型定義のみを行い、実行時の動作は変更しません。**

1. **設定の一元化** - すべての国際化設定を一箇所にまとめる
2. **意味のあるロケールコードの使用** - 必要に応じて `"en-US"` と `"en"` を区別するなど。
3. **フォールバックの設定** - 必ずフォールバックロケールを設定する
4. **型安全性の活用** - 生成された型をアプリケーションで使用する

という使用を想定しています。

### オプション

#### locales

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

#### defaultLocale

```typescript
export const i18nConfig = defineI18nConfig({
  locales: {
    en: { name: "English" },
    ja: { name: "日本語" },
  },
  defaultLocale: "en",
});
```

#### fallbackLocale

```typescript
export const i18nConfig = defineI18nConfig({
  locales: {
    en: { name: "English" },
    ja: { name: "日本語" },
    zh: { name: "中文" },
  },
  defaultLocale: "en",
  fallbackLocale: "en",
});
```

#### interpolationFormat

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

- `"legacy"`: `{name}`
- `"intl"`: `{$name}`
- `"double"`: `{{name}}`
- `"none"`: 補間なし

### 生成されるプロパティ

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

#### localeKeys

定義されたすべてのロケールキーの配列：

```typescript
const supportedLocales = i18nConfig.localeKeys;
// ["en-US", "ja-JP", "zh-CN"]
```

#### isValidLocale

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

#### getLocaleConfig

特定のロケールの設定を取得：

```typescript
const enConfig = i18nConfig.getLocaleConfig("en-US");
// { name: "English" }
```

## 型安全性

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
