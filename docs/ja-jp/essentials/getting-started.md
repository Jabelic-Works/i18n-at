# スタートガイド

このガイドでは、Next.js アプリケーションで i18n-at をセットアップする方法を説明します。

## 基本セットアップ

### 1. 最初のメッセージを作成

アプリケーション用のメッセージを定義します：

```typescript
// messages.ts
import { defineMessages } from "i18n-at";

export const { messages } = defineMessages({
  en: {
    home: {
      title: "Welcome to i18n-at",
      description: "The type-safe internationalization library",
    },
  },
  ja: {
    home: {
      title: "i18n-atへようこそ",
      description: "タイプセーフな国際化ライブラリ",
    },
  },
});
```

### 2. Server Components で使用

```typescript
// app/[locale]/page.tsx
import { getI18n } from "i18n-at";
import { messages } from "@/messages";

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t, m } = getI18n(messages, locale);

  return (
    <main>
      <h1>{t(m.home.title)}</h1>
      <p>{t(m.home.description)}</p>
    </main>
  );
}
```

### 3. Client Components 用のプロバイダーを設定

`useI18n`や`useLocale`フックを使った Client Components を使用する予定の場合、ロケールプロバイダーを設定する必要があります：

```typescript
// app/layout.tsx
import { I18nClientProvider } from "i18n-at";

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale}>
      <body>
        <I18nClientProvider locale={locale}>{children}</I18nClientProvider>
      </body>
    </html>
  );
}
```

### 4. Client Components で使用

Client Components では、ステップ 3 で`I18nClientProvider`を設定していることを確認してください：

```typescript
// components/Header.tsx
"use client";
import { useI18n } from "i18n-at";
import { messages } from "@/messages";

export default function Header() {
  const { t, m } = useI18n(messages);

  return (
    <header>
      <h1>{t(m.home.title)}</h1>
    </header>
  );
}
```

**重要**: `useI18n`と`useLocale`フックは現在のロケールにアクセスするために`I18nClientProvider`が必要です。プロバイダーがないと、これらのフックは動作しません。

## 主要機能

### 型安全性

TypeScript がメッセージの完全な自動補完を提供することに注目してください：

```typescript
const { t, m } = useI18n(messages);

// ✅ TypeScriptがこれらの存在を認識
t(m.home.title);
t(m.home.description);

// ❌ TypeScriptエラー - プロパティが存在しない
t(m.home.subtitle);
```

### IDE ナビゲーション

任意のメッセージ参照で F12 キーを押すと、その定義に直接ジャンプします：

```typescript
// m.home.titleでF12キーを押すとメッセージ定義にジャンプ
<h1>{t(m.home.title)}</h1>
```

## 次のステップ

- [メッセージフォーマット構文](/ja-jp/essentials/message-format-syntax)を学ぶ
- [変数の補間](/ja-jp/essentials/interpolation)を探る
- [TypeScript サポート](/ja-jp/advanced/typescript-support)を理解する
