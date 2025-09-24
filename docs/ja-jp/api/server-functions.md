# サーバー関数

Next.js サーバーコンポーネントで i18n-at を使用するための関数です。

## getI18n

サーバーコンポーネントで使用する翻訳関数を取得します。

### 構文

```typescript
function getI18n<T extends Messages>(
  messages: T,
  locale: string
): {
  t: TranslateFunction<T>;
  m: T[keyof T];
};
```

### パラメータ

- `messages`: `defineMessages`で作成されたメッセージオブジェクト
- `locale`: 現在のロケール文字列

### 戻り値

以下を含むオブジェクト：

- `t`: メッセージ参照とパラメータを受け取る翻訳関数
- `m`: 現在のロケールのメッセージへの直接アクセス

### 例

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
      <p>{t(m.welcome, { name: "User" })}</p>
    </div>
  );
}
```

### 非同期コンポーネントでの使用

```typescript
export default async function AsyncPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t, m } = getI18n(messages, locale);
  const data = await fetchData();

  return (
    <div>
      <h1>{t(m.pageTitle)}</h1>
      <p>{t(m.dataCount, { count: data.length })}</p>
    </div>
  );
}
```

### レイアウトでの使用

```typescript
// app/[locale]/layout.tsx
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
        <h1>{t(m.app.name)}</h1>
        <nav>
          <a href={`/${locale}`}>{t(m.nav.home)}</a>
          <a href={`/${locale}/about`}>{t(m.nav.about)}</a>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
```

### メタデータ生成

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
    openGraph: {
      title: t(m.meta.ogTitle),
      description: t(m.meta.ogDescription),
    },
  };
}
```

## サーバーコンポーネントパターン

### 静的生成

```typescript
// すべてのロケール用の静的ページを生成
export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ja" }, { locale: "zh" }];
}

export default function StaticPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t, m } = getI18n(messages, locale);
  return <article>{t(m.content)}</article>;
}
```

### 動的ルート

```typescript
// app/[locale]/products/[id]/page.tsx
export default function ProductPage({
  params: { locale, id },
}: {
  params: { locale: string; id: string };
}) {
  const { t, m } = getI18n(messages, locale);

  return (
    <div>
      <h1>{t(m.product.title)}</h1>
      <p>{t(m.product.id, { id })}</p>
    </div>
  );
}
```

### エラーハンドリング

```typescript
export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  try {
    const { t, m } = getI18n(messages, locale);
    return <h1>{t(m.title)}</h1>;
  } catch (error) {
    // デフォルトロケールにフォールバック
    const { t, m } = getI18n(messages, "en");
    return <h1>{t(m.title)}</h1>;
  }
}
```

## パフォーマンスの考慮事項

### キャッシング

サーバーコンポーネントは Next.js でデフォルトでキャッシュされます：

```typescript
// このコンポーネントはキャッシュされます
export default function CachedPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t, m } = getI18n(messages, locale);
  return <div>{t(m.staticContent)}</div>;
}

// 必要に応じて動的レンダリングを強制
export const dynamic = "force-dynamic";
```

### ストリーミング

React Suspense と組み合わせてストリーミングに使用：

```typescript
import { Suspense } from "react";

function LoadingFallback({ locale }: { locale: string }) {
  const { t, m } = getI18n(messages, locale);
  return <div>{t(m.loading)}</div>;
}

export default function StreamingPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <Suspense fallback={<LoadingFallback locale={locale} />}>
      <AsyncContent locale={locale} />
    </Suspense>
  );
}
```

## ベストプラクティス

1. **サーバーコンポーネントでのみ使用** - この関数はクライアントコンポーネント用ではありません
2. **ロケールを明示的に渡す** - 常にページプロップからロケールパラメータを渡す
3. **フォールバックを処理** - サポートされていないロケールのフォールバック動作を考慮
4. **静的生成を最適化** - 可能な場合は静的生成を優先

## よくある問題

### ロケールが見つからない場合

```typescript
// 不足しているロケールを適切に処理
const { t, m } = getI18n(messages, locale || "en");
```

### 型安全性

```typescript
// ロケールが有効であることを確認
type SupportedLocale = keyof typeof messages;

function isValidLocale(locale: string): locale is SupportedLocale {
  return locale in messages;
}

export default function Page({ params: { locale } }) {
  const validLocale = isValidLocale(locale) ? locale : "en";
  const { t, m } = getI18n(messages, validLocale);
  // ...
}
```

## 次のステップ

- [クライアント関数](/ja-jp/api/client-functions)を学ぶ
- [コア関数](/ja-jp/api/core-functions)を探る
- [型定義](/ja-jp/api/types)を理解する
