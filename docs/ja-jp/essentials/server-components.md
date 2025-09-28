# サーバーコンポーネント

## 基本的な使用方法

サーバーコンポーネントでは、`getI18n`関数を使用します：

```typescript
// app/[locale]/page.tsx
import { getI18n } from "i18n-at";
import { messages } from "@/messages";

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t, m } = getI18n(messages, locale);

  return (
    <div>
      <h1>{t(m.title)}</h1>
      <p>{t(m.description)}</p>
    </div>
  );
}
```

local 情報と message 情報は import し、getI18n 関数に引数として渡します。

## ベストプラクティス

### 1. サーバーコンポーネントを優先

可能であれば、静的な翻訳コンテンツにはサーバーコンポーネントを使用：

```typescript
// ✅ 良い例 - 静的コンテンツのサーバーコンポーネント
export default function AboutPage({ params: { locale } }) {
  const { t, m } = getI18n(messages, locale);
  return <article>{t(m.about.content)}</article>;
}
```

### 2. メッセージのコロケーション

メッセージを使用場所の近くに配置：

```typescript
// about/messages.ts
export const { messages: aboutMessages } = defineMessages({
  en: { title: "About Us", content: "..." },
  ja: { title: "私たちについて", content: "..." },
});

// about/page.tsx
import { getI18n } from "i18n-at";
import { aboutMessages } from "./messages";

export default function AboutPage({ params: { locale } }) {
  const { t, m } = getI18n(aboutMessages, locale);
  return <h1>{t(m.title)}</h1>;
}
```

### 3. 動的ルートの処理

動的ルートでは、ロケールが適切に処理されることを確認：

```typescript
// app/[locale]/products/[id]/page.tsx
export default function ProductPage({
  params: { locale, id },
}: {
  params: { locale: string; id: string };
}) {
  const { t, m } = getI18n(messages, locale);
  // localeとidの両方のパラメータを使用
}
```
