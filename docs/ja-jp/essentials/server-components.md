# サーバーコンポーネント

最適なパフォーマンスのために Next.js サーバーコンポーネントで i18n-at を使用する方法を学びます。

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

## 非同期コンポーネント

サーバーコンポーネントは非同期にできるため、翻訳と並行してデータを取得できます：

```typescript
import { getI18n } from "i18n-at";
import { messages } from "@/messages";

export default async function ProductPage({
  params: { locale, id },
}: {
  params: { locale: string; id: string };
}) {
  const { t, m } = getI18n(messages, locale);

  // 翻訳の準備と並行してデータを取得
  const product = await fetchProduct(id);

  return (
    <div>
      <h1>{t(m.product.title, { name: product.name })}</h1>
      <p>{t(m.product.price, { amount: product.price })}</p>
    </div>
  );
}
```

## レイアウトコンポーネント

レイアウトコンポーネントで翻訳を使用：

```typescript
// app/[locale]/layout.tsx
import { getI18n } from "i18n-at";
import { messages } from "@/messages";

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { t, m } = getI18n(messages, locale);

  return (
    <div>
      <header>
        <h1>{t(m.app.title)}</h1>
      </header>
      <main>{children}</main>
      <footer>
        <p>{t(m.app.copyright)}</p>
      </footer>
    </div>
  );
}
```

## メタデータ

SEO 用のローカライズされたメタデータを生成：

```typescript
import { Metadata } from "next";
import { getI18n } from "i18n-at";
import { messages } from "@/messages";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { t, m } = getI18n(messages, locale);

  return {
    title: t(m.meta.title),
    description: t(m.meta.description),
  };
}
```

## パフォーマンスの利点

i18n-at を使用したサーバーコンポーネントは、いくつかのパフォーマンス上の利点を提供します：

1. **クライアントに JavaScript を送信しない** - 翻訳はサーバーでレンダリング
2. **バンドルサイズの削減** - 翻訳されたテキストを含む HTML のみが送信
3. **SEO の向上** - 検索エンジンが完全に翻訳されたコンテンツを認識
4. **初期読み込みの高速化** - クライアントサイドでの翻訳処理なし

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

## 次のステップ

- [クライアントコンポーネント](/ja-jp/essentials/client-components)を学ぶ
- [TypeScript サポート](/ja-jp/advanced/typescript-support)を探る
