# パフォーマンス最適化

最高のパフォーマンスのために i18n-at 実装を最適化する方法を学びます。

## メッセージ分割戦略

### ルート別

初期バンドルサイズを削減するためにルートごとにメッセージを分割：

```typescript
// app/[locale]/home/messages.ts
export const { messages: homeMessages } = defineMessages({
  en: { title: "Home", welcome: "Welcome" },
  ja: { title: "ホーム", welcome: "ようこそ" },
});

// app/[locale]/about/messages.ts
export const { messages: aboutMessages } = defineMessages({
  en: { title: "About Us", content: "..." },
  ja: { title: "私たちについて", content: "..." },
});
```

### 機能別

大きな機能を別々のメッセージモジュールに整理：

```typescript
// features/auth/messages.ts
export const { messages: authMessages } = defineMessages({
  en: {
    login: {
      /* ログインメッセージ */
    },
    register: {
      /* 登録メッセージ */
    },
    reset: {
      /* パスワードリセットメッセージ */
    },
  },
});

// features/dashboard/messages.ts
export const { messages: dashboardMessages } = defineMessages({
  en: {
    widgets: {
      /* ウィジェットメッセージ */
    },
    stats: {
      /* 統計メッセージ */
    },
  },
});
```

## サーバーサイド最適化

### 静的生成

ビルド時に翻訳されたページを事前レンダリング：

```typescript
// app/[locale]/static-page/page.tsx
import { getI18n } from "i18n-at";
import { messages } from "./messages";

// 各ロケール用の静的ページを生成
export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ja" }, { locale: "zh" }];
}

export default function StaticPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t, m } = getI18n(messages, locale);

  // このページは翻訳と一緒に静的生成される
  return <article>{t(m.content)}</article>;
}
```

### 選択的ハイドレーション

インタラクティブな部分のみをハイドレート：

```typescript
// サーバーコンポーネント（ハイドレーション不要）
import { getI18n } from "i18n-at";
import InteractiveSection from "./InteractiveSection";

export default function Page({ params: { locale } }) {
  const { t, m } = getI18n(messages, locale);

  return (
    <div>
      {/* 静的コンテンツ - JSは不要 */}
      <h1>{t(m.title)}</h1>
      <p>{t(m.description)}</p>

      {/* この部分のみハイドレーションが必要 */}
      <InteractiveSection />
    </div>
  );
}
```

## クライアントサイド最適化

### メモ化

高コストな翻訳操作をメモ化：

```typescript
"use client";
import { useMemo } from "react";
import { useI18n } from "i18n-at";

function DataTable({ data }: { data: Item[] }) {
  const { t, m } = useI18n(messages);

  // 翻訳されたヘッダーをメモ化
  const headers = useMemo(
    () => [
      { key: "name", label: t(m.table.headers.name) },
      { key: "status", label: t(m.table.headers.status) },
      { key: "date", label: t(m.table.headers.date) },
    ],
    [t, m]
  );

  // 行の翻訳をメモ化
  const rows = useMemo(
    () =>
      data.map((item) => ({
        ...item,
        statusLabel: t(m.statuses[item.status]),
        dateLabel: formatDate(item.date, locale),
      })),
    [data, t, m, locale]
  );

  return <Table headers={headers} rows={rows} />;
}
```

### バッチ更新

不要な再レンダリングを避けるために翻訳更新をバッチ化：

```typescript
"use client";
import { unstable_batchedUpdates } from "react-dom";

function MultiStepForm() {
  const { t, m } = useI18n(messages);
  const [errors, setErrors] = useState({});

  const validateForm = (data: FormData) => {
    const newErrors = {};

    // すべてのエラー更新をバッチ化
    unstable_batchedUpdates(() => {
      if (!data.email) {
        newErrors.email = t(m.errors.emailRequired);
      }
      if (!data.password) {
        newErrors.password = t(m.errors.passwordRequired);
      }
      setErrors(newErrors);
    });
  };
}
```

## バンドルサイズ最適化

### ツリーシェイキング

未使用のメッセージが削除されることを保証：

```typescript
// 必要なもののみをインポート
import { defineMessages } from "i18n-at";
import { getI18n } from "i18n-at/server";
import { useI18n } from "i18n-at/client";

// これにより、より良いツリーシェイキングが可能になる
```

### 動的メッセージ読み込み

ユーザー設定に基づいてメッセージを読み込み：

```typescript
// utils/loadMessages.ts
const messageLoaders = {
  en: () => import("./messages/en"),
  ja: () => import("./messages/ja"),
  zh: () => import("./messages/zh"),
};

export async function loadMessagesForLocale(locale: string) {
  const loader = messageLoaders[locale] || messageLoaders.en;
  const module = await loader();
  return module.messages;
}
```

## キャッシュ戦略

### メッセージキャッシュ

読み込まれたメッセージをメモリにキャッシュ：

```typescript
// utils/messageCache.ts
class MessageCache {
  private cache = new Map<string, any>();

  async get(key: string, loader: () => Promise<any>) {
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }

    const messages = await loader();
    this.cache.set(key, messages);
    return messages;
  }

  clear() {
    this.cache.clear();
  }
}

export const messageCache = new MessageCache();

// 使用例
const messages = await messageCache.get(
  `dashboard-${locale}`,
  () => import(`./messages/${locale}`)
);
```

### 翻訳結果キャッシュ

計算された翻訳をキャッシュ：

```typescript
"use client";
import { useMemo } from "react";
import LRU from "lru-cache";

const translationCache = new LRU<string, string>({ max: 500 });

function useCachedTranslation(messages: any) {
  const { t: originalT, m } = useI18n(messages);

  const t = useMemo(() => {
    return (key: any, params?: any) => {
      const cacheKey = JSON.stringify({ key, params });

      if (translationCache.has(cacheKey)) {
        return translationCache.get(cacheKey)!;
      }

      const result = originalT(key, params);
      translationCache.set(cacheKey, result);
      return result;
    };
  }, [originalT]);

  return { t, m };
}
```

## 監視とメトリクス

### パフォーマンス追跡

翻訳パフォーマンスを追跡：

```typescript
// utils/performanceTracking.ts
export function trackTranslationPerformance() {
  if (typeof window === "undefined") return;

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.name.includes("translation")) {
        console.log(`Translation took ${entry.duration}ms`);
        // アナリティクスに送信
      }
    }
  });

  observer.observe({ entryTypes: ["measure"] });
}

// コンポーネントでの使用
function measureTranslation<T>(name: string, fn: () => T): T {
  performance.mark(`${name}-start`);
  const result = fn();
  performance.mark(`${name}-end`);
  performance.measure(name, `${name}-start`, `${name}-end`);
  return result;
}
```

## ベストプラクティス

1. **メッセージサイズを最小化** - メッセージを簡潔に保ち、大きなセットを分割
2. **サーバーコンポーネントを使用** - 静的翻訳をサーバーでレンダリング
3. **適切な場合は遅延読み込み** - 必要に応じてメッセージを読み込み
4. **積極的にキャッシュ** - メッセージと翻訳の両方をキャッシュ
5. **バンドルへの影響を監視** - 翻訳がバンドルサイズに与える影響を追跡

## 次のステップ

- [遅延読み込み](/ja-jp/advanced/lazy-loading)を学ぶ
- [TypeScript サポート](/ja-jp/advanced/typescript-support)を探る
