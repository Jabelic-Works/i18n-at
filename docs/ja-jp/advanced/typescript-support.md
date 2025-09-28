# TypeScript サポート

i18n-at は一流の TypeScript サポートを提供し、国際化ワークフロー全体で型安全性を保証します。

## 型安全なメッセージアクセス

すべてのメッセージパスは完全に型付けされています：

```typescript
const { messages } = defineMessages({
  en: {
    user: {
      profile: {
        name: "Name",
        email: "Email",
      },
    },
  },
});

const { t, m } = useI18n(messages);

// ✅ TypeScriptがすべてのパスに自動補完を提供
t(m.user.profile.name);
t(m.user.profile.email);

// ❌ TypeScriptエラー - プロパティが存在しない
t(m.user.profile.phone);
//               ^^^^^ Property 'phone' does not exist
```

## パラメータの型安全性

TypeScript は必要なすべての補間パラメータの提供を保証します：

```typescript
const { messages } = defineMessages({
  en: {
    greeting: "Hello, {$name}!",
    orderStatus: "Order {$id} is {$status}",
  },
});

const { t, m } = useI18n(messages);

// ✅ TypeScriptが正確なパラメータ型を認識
t(m.greeting, { name: "Alice" });
t(m.orderStatus, { id: "123", status: "shipped" });

// ❌ TypeScriptエラー - 必要なパラメータが不足
t(m.greeting);
// Error: Argument of type '{}' is not assignable to parameter

// ❌ TypeScriptエラー - 間違ったパラメータ名
t(m.greeting, { username: "Alice" });
// Error: Object literal may only specify known properties
```

## 厳密な型チェック

### メッセージ構造の検証

すべてのロケールが同じメッセージ構造を持つことを保証：

```typescript
// メッセージ構造の型を定義
type MessageStructure = {
  auth: {
    login: string;
    logout: string;
    errors: {
      invalidCredentials: string;
      networkError: string;
    };
  };
  dashboard: {
    title: string;
    welcome: string;
  };
};

// satisfiesを使用して各ロケールが構造に一致することを保証
const { messages } = defineMessages({
  en: {
    auth: {
      login: "Login",
      logout: "Logout",
      errors: {
        invalidCredentials: "Invalid credentials",
        networkError: "Network error",
      },
    },
    dashboard: {
      title: "Dashboard",
      welcome: "Welcome back!",
    },
  } satisfies MessageStructure,

  ja: {
    auth: {
      login: "ログイン",
      logout: "ログアウト",
      errors: {
        invalidCredentials: "認証情報が無効です",
        networkError: "ネットワークエラー",
      },
    },
    dashboard: {
      title: "ダッシュボード",
      welcome: "おかえりなさい！",
    },
  } satisfies MessageStructure,
});
```

### カスタム型ガード

動的メッセージアクセス用の型ガードを作成：

```typescript
const { messages } = defineMessages({
  en: {
    errors: {
      notFound: "Not found",
      unauthorized: "Unauthorized",
      serverError: "Server error",
    },
  },
});

// エラーコード用の型ガード
type ErrorCode = "notFound" | "unauthorized" | "serverError";

function isValidErrorCode(code: string): code is ErrorCode {
  return ["notFound", "unauthorized", "serverError"].includes(code);
}

// 型安全性を持った使用法
function showError(errorCode: string) {
  const { t, m } = useI18n(messages);

  if (isValidErrorCode(errorCode)) {
    return t(m.errors[errorCode]); // TypeScriptがこれが安全であることを認識
  }

  return t(m.errors.serverError); // フォールバック
}
```

## ジェネリックコンポーネント

型安全なジェネリックコンポーネントを作成：

```typescript
import { defineMessages, Messages } from "i18n-at";

// 任意のメッセージ構造を受け入れるジェネリックコンポーネント
function TranslatedText<T extends Messages>({
  messages,
  messagePath,
  params,
}: {
  messages: T;
  messagePath: (m: T[keyof T]) => string;
  params?: Record<string, string | number>;
}) {
  const { t, m } = useI18n(messages);
  return <span>{t(messagePath(m), params)}</span>;
}

// 使用例
const { messages } = defineMessages({
  en: { hello: "Hello, {$name}!" },
});

<TranslatedText
  messages={messages}
  messagePath={(m) => m.hello}
  params={{ name: "World" }}
/>;
```

## 型推論

i18n-at はメッセージ定義から自動的に型を推論します：

```typescript
const { messages } = defineMessages({
  en: {
    simple: "Simple message",
    withParam: "Hello, {$name}!",
    multipleParams: "{$count} items in {$category}",
  },
});

// TypeScriptが推論：
// - m.simple: パラメータ不要
// - m.withParam: { name: string | number } が必要
// - m.multipleParams: { count: string | number, category: string | number } が必要

const { t, m } = useI18n(messages);

// TypeScriptが推論に基づいて正しい使用法を強制
t(m.simple); // ✅ パラメータ不要
t(m.withParam, { name: "Al" }); // ✅ 正しいパラメータ
t(m.multipleParams, {
  // ✅ すべてのパラメータが提供されている
  count: 5,
  category: "Electronics",
});
```

## 高度な型

### 条件型

柔軟なメッセージハンドリングに条件型を使用：

```typescript
type LocalizedMessage<T> = T extends { $params: infer P }
  ? (params: P) => string
  : () => string;

// これにより、より高度な型操作が可能になります
```

### ユーティリティ型

一般的なパターン用のユーティリティ型を作成：

```typescript
// すべてのメッセージキーを抽出
type MessageKeys<T> = T extends Record<string, any>
  ? {
      [K in keyof T]: T[K] extends string ? K : MessageKeys<T[K]>;
    }[keyof T]
  : never;

// 特定のメッセージのパラメータ型を取得
type MessageParams<T> = T extends `${string}{$${infer Param}}${infer Rest}`
  ? { [K in Param]: string | number } & MessageParams<Rest>
  : {};
```

## 高度な型パターン

### 厳密なメッセージ型

厳密なメッセージ型定義を作成：

```typescript
type StrictMessages<T extends Messages> = {
  [K in keyof T]: {
    [MK in keyof T[K]]: T[K][MK] extends string
      ? T[K][MK]
      : T[K][MK] extends object
      ? StrictMessages<{ _: T[K][MK] }>["_"]
      : never;
  };
};

// 使用例
const messages = defineMessages({
  en: { greeting: "Hello" },
  ja: { greeting: "こんにちは" },
} satisfies StrictMessages<{ en: any; ja: any }>);
```

### ロケール対応型

利用可能なロケールを認識する型を作成：

```typescript
type LocaleMessages<T extends Messages> = {
  [K in keyof T]: {
    locale: K;
    messages: T[K];
  };
}[keyof T];

// 使用例
type AvailableLocales = LocaleMessages<typeof messages>;
// { locale: "en"; messages: {...} } | { locale: "ja"; messages: {...} }
```

### メッセージパス型

メッセージのドット記法パスを生成：

```typescript
type MessagePath<T, P extends string = ""> = T extends object
  ? {
      [K in keyof T]: T[K] extends string
        ? `${P}${K & string}`
        : MessagePath<T[K], `${P}${K & string}.`>;
    }[keyof T]
  : never;

// 使用例
type Paths = MessagePath<{ user: { name: string; email: string } }>;
// "user.name" | "user.email"
```

## 型ガード

### isValidLocale

有効なロケールをチェックする型ガード：

```typescript
function isValidLocale<T extends Messages>(
  locale: string,
  messages: T
): locale is keyof T {
  return locale in messages;
}

// 使用例
if (isValidLocale(locale, messages)) {
  // ここでTypeScriptはlocaleが有効であることを認識
  const { t, m } = getI18n(messages, locale);
}
```

### hasParameters

メッセージがパラメータを持つかをチェックする型ガード：

```typescript
function hasParameters<T extends string>(
  message: T
): message is T & { __params: ExtractParams<T> } {
  return message.includes("{$");
}
```

## 設定型ユーティリティ

### 設定から型を抽出

```typescript
const config = defineI18nConfig({
  locales: {
    en: { name: "English" },
    ja: { name: "日本語" },
  },
  defaultLocale: "en",
});

// サポートされるロケールを抽出
type SupportedLocale = ExtractConfigLocales<typeof config>;
// "en" | "ja"

// デフォルトロケールを抽出
type DefaultLocale = ExtractDefaultLocale<typeof config>;
// "en"

// 生設定からすべてのロケールを抽出
type AllLocales = ExtractLocales<typeof config>;
// "en" | "ja"
```

### ジェネリック制約

```typescript
type MessageConstraint = Record<string, Record<string, any>>;
type LocaleConstraint<T extends Messages> = keyof T & string;

function processMessages<T extends MessageConstraint>(messages: T) {
  // 型安全性を持ってメッセージを処理
}

function validateLocale<T extends Messages>(
  locale: string,
  messages: T
): LocaleConstraint<T> | undefined {
  return locale in messages ? (locale as LocaleConstraint<T>) : undefined;
}
```

## ベストプラクティス

1. **構造検証に`satisfies`を使用** - すべてのロケールが同じ形を持つことを保証
2. **型推論を活用** - TypeScript に定義から型を推論させる
3. **動的アクセス用の型ガードを作成** - 動的メッセージキーを安全に処理
4. **ジェネリックコンポーネントを使用** - 再利用可能で型安全な翻訳コンポーネントを構築
5. **設定型を抽出** - ロケール管理にユーティリティ型を使用
