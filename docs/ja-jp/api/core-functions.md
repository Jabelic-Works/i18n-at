# コア関数

i18n-at でメッセージを定義・管理するためのコア関数群です。

## defineMessages

複数のロケールをサポートした型安全なメッセージ定義を作成します。

### 構文

```typescript
function defineMessages<T extends Messages>(
  messages: T
): {
  messages: T;
  at: <K extends keyof T>(locale: K, messages: T) => T[K];
};
```

### パラメータ

- `messages`: 各ロケールのメッセージ定義を含むオブジェクト

### 戻り値

以下を含むオブジェクト：

- `messages`: 完全な型情報を持つ元のメッセージオブジェクト
- `at`: 特定のロケールのメッセージを抽出する関数

### 例

```typescript
import { defineMessages } from "i18n-at";

const { messages, at } = defineMessages({
  en: {
    greeting: "Hello, {$name}!",
    farewell: "Goodbye!",
  },
  ja: {
    greeting: "こんにちは、{$name}さん！",
    farewell: "さようなら！",
  },
});

// 特定のロケールのメッセージを抽出
const enMessages = at("en", messages); // { greeting: "Hello, {$name}!", farewell: "Goodbye!" }
const jaMessages = at("ja", messages); // { greeting: "こんにちは、{$name}さん！", farewell: "さようなら！" }
```

### 型安全性

この関数は完全な型推論を提供します：

```typescript
const { messages } = defineMessages({
  en: {
    user: {
      name: "Name",
      email: "Email",
    },
  },
});

// TypeScriptが正確な構造を認識
type MessageType = typeof messages;
```

## defineI18nConfig

型安全性とヘルパー関数を備えた i18n 設定オブジェクトを作成します。

### 構文

```typescript
function defineI18nConfig<T extends Record<string, LocaleConfig>>(
  config: I18nConfig<T>
): ConfigResult<T>;
```

### 例

```typescript
import { defineI18nConfig } from "i18n-at";

export const i18nConfig = defineI18nConfig({
  locales: {
    en: { name: "English" },
    ja: { name: "日本語" },
  },
  defaultLocale: "en",
  fallbackLocale: "en",
  interpolationFormat: "intl",
});

// 生成されたプロパティ
i18nConfig.localeKeys; // ["en", "ja"]
i18nConfig.isValidLocale("en"); // true
i18nConfig.getLocaleConfig("en"); // { name: "English" }
```

## at

メッセージ定義から特定のロケールのメッセージを抽出します。

### 構文

```typescript
function at<T extends Messages, K extends keyof T>(
  locale: K,
  messages: T
): T[K];
```

### 例

```typescript
import { defineMessages, at } from "i18n-at";

const { messages } = defineMessages({
  en: { welcome: "Welcome!" },
  ja: { welcome: "ようこそ！" },
});

// スタンドアロンのat関数を使用
const enMessages = at("en", messages); // { welcome: "Welcome!" }
const jaMessages = at("ja", messages); // { welcome: "ようこそ！" }
```

## ベストプラクティス

1. **モジュールレベルでメッセージを定義** - コンポーネント内でのメッセージ定義は避ける
2. **const assertions を使用** - 必要に応じてより厳密な型チェックのために
3. **機能ごとに整理** - 関連するメッセージをグループ化
4. **可能な限りメッセージを平坦に** - 深いネストはメッセージの管理を困難にする

## 次のステップ

- [サーバー関数](/ja-jp/api/server-functions)を学ぶ
- [クライアント関数](/ja-jp/api/client-functions)を探る
- [型定義](/ja-jp/api/types)を理解する
