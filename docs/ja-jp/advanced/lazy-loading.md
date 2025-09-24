# 遅延読み込み

必要なときにのみ翻訳を読み込むことでバンドルサイズを最適化します。

## 動的インポート

メッセージモジュールを動的に読み込み：

```typescript
// 静的インポートの代わりに
// import { messages } from "./messages";

// 動的インポートを使用
const loadMessages = async (locale: string) => {
  const module = await import(`./messages/${locale}`);
  return module.messages;
};

// コンポーネントでの使用
function MyComponent({ locale }: { locale: string }) {
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    loadMessages(locale).then(setMessages);
  }, [locale]);

  if (!messages) return <div>Loading translations...</div>;

  const { t, m } = useI18n(messages);
  return <h1>{t(m.title)}</h1>;
}
```

## ルートベースの分割

Next.js アプリケーションのルートごとに翻訳を分割：

```typescript
// app/[locale]/products/messages.ts
export const getProductMessages = async (locale: string) => {
  // 現在のロケールのメッセージのみを読み込み
  switch (locale) {
    case "en":
      const enModule = await import("./messages/en");
      return enModule.messages;
    case "ja":
      const jaModule = await import("./messages/ja");
      return jaModule.messages;
    default:
      const defaultModule = await import("./messages/en");
      return defaultModule.messages;
  }
};

// app/[locale]/products/page.tsx
import { getProductMessages } from "./messages";

export default async function ProductsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const messages = await getProductMessages(locale);
  const { t, m } = getI18n(messages, locale);

  return <h1>{t(m.title)}</h1>;
}
```

## 機能ベースの分割

機能ごとに翻訳を整理し、オンデマンドで読み込み：

```typescript
// features/checkout/loadMessages.ts
export async function loadCheckoutMessages(locale: string) {
  const messages = await import(`./messages/${locale}.ts`);
  return messages.default;
}

// features/checkout/CheckoutForm.tsx
("use client");
import { useState, useEffect } from "react";
import { useI18n, useLocale } from "i18n-at";

export function CheckoutForm() {
  const locale = useLocale();
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    import(`./messages/${locale}.ts`).then((m) => setMessages(m.default));
  }, [locale]);

  if (!messages) return <LoadingSpinner />;

  const { t, m } = useI18n(messages);
  return (
    <form>
      <h2>{t(m.title)}</h2>
      {/* フォームフィールド */}
    </form>
  );
}
```

## Suspense 統合

より簡潔な遅延読み込みに React Suspense を使用：

```typescript
import { lazy, Suspense } from "react";

// メッセージと一緒に遅延読み込みされるコンポーネントを作成
const LazyDashboard = lazy(async () => {
  const [component, messages] = await Promise.all([
    import("./Dashboard"),
    import("./messages"),
  ]);

  // メッセージが注入されたコンポーネントを返す
  return {
    default: () => <component.default messages={messages.messages} />,
  };
});

// 使用例
export function App() {
  return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <LazyDashboard />
    </Suspense>
  );
}
```

## プログレッシブエンハンスメント

コアメッセージを即座に読み込み、追加メッセージで拡張：

```typescript
// コアメッセージ（小さく、重要）
const { messages: coreMessages } = defineMessages({
  en: {
    loading: "Loading...",
    error: "Error occurred",
  },
});

// 拡張メッセージ（大きく、重要度が低い）
async function loadExtendedMessages(locale: string) {
  const module = await import(`./extended/${locale}`);
  return module.messages;
}

// プログレッシブ読み込みを持つコンポーネント
function EnhancedComponent() {
  const [extendedMessages, setExtendedMessages] = useState(null);
  const locale = useLocale();

  useEffect(() => {
    loadExtendedMessages(locale).then(setExtendedMessages);
  }, [locale]);

  // コアメッセージを即座に使用
  const { t: tCore, m: mCore } = useI18n(coreMessages);

  // 利用可能になったら拡張メッセージを使用
  const extended = extendedMessages ? useI18n(extendedMessages) : null;

  return (
    <div>
      <h1>{extended ? extended.t(extended.m.title) : tCore(mCore.loading)}</h1>
    </div>
  );
}
```

## バンドル解析

バンドルサイズへの影響を監視：

```typescript
// webpack.config.js または next.config.js
module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // 翻訳チャンクを分割
      config.optimization.splitChunks.cacheGroups.translations = {
        test: /messages[\\/]/,
        name: "translations",
        chunks: "async",
      };
    }
    return config;
  },
};
```

## ベストプラクティス

### 1. 戦略的分割

以下に基づいてメッセージを分割：

- **ルート境界** - 各ルートが独自のメッセージを読み込み
- **機能境界** - 大きな機能が独立して読み込み
- **ユーザージャーニー** - ユーザーが進行するにつれてメッセージを読み込み

### 2. プリロード

次のステップで可能性の高いメッセージを事前読み込み：

```typescript
// ユーザーがカートに追加するときにチェックアウトメッセージを事前読み込み
function AddToCartButton() {
  const handleClick = () => {
    // カートに追加のロジック

    // チェックアウトメッセージを事前読み込み
    import("@/features/checkout/messages");
  };

  return <button onClick={handleClick}>Add to Cart</button>;
}
```

### 3. キャッシュ戦略

読み込まれたメッセージのキャッシュを実装：

```typescript
const messageCache = new Map();

export async function getCachedMessages(locale: string, feature: string) {
  const cacheKey = `${locale}-${feature}`;

  if (messageCache.has(cacheKey)) {
    return messageCache.get(cacheKey);
  }

  const messages = await import(`./messages/${locale}/${feature}`);
  messageCache.set(cacheKey, messages.default);

  return messages.default;
}
```

## パフォーマンスのヒント

1. **コアメッセージを小さく保つ** - 必要不可欠な UI テキストのみを含める
2. **コード分割を使用** - バンドラーにチャンクサイズを最適化させる
3. **バンドルサイズを監視** - 翻訳がバンドルサイズに与える影響を追跡
4. **SSG/SSR を検討** - 可能な場合は翻訳されたコンテンツをサーバーレンダリング

## 次のステップ

- [パフォーマンス最適化](/ja-jp/advanced/optimization)を学ぶ
- [コンポーネントパターン](/ja-jp/advanced/component-patterns)を探る
