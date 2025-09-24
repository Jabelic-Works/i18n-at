# クライアント関数

クライアントコンポーネントで i18n-at を使用するための関数とフックです。

## I18nClientProvider

`useI18n`および`useLocale`フックを使用するクライアントコンポーネントにロケールコンテキストを提供するプロバイダーコンポーネントです。

### プロップス

```typescript
interface I18nClientProviderProps {
  locale: string;
  children: React.ReactNode;
}
```

### 例

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

### ネストしたプロバイダー

```typescript
// アプリの異なる部分でネストできます
<I18nClientProvider locale={mainLocale}>
  <MainApp />
  <I18nClientProvider locale={widgetLocale}>
    <Widget />
  </I18nClientProvider>
</I18nClientProvider>
```

## useI18n

クライアントコンポーネントで翻訳関数にアクセスするためのフックです。

### 構文

```typescript
function useI18n<T extends Messages>(
  messages: T
): {
  t: TranslateFunction<T>;
  m: T[keyof T];
};
```

### パラメータ

- `messages`: `defineMessages`で作成されたメッセージオブジェクト

### 戻り値

- `t`: メッセージ参照とパラメータを受け取る翻訳関数
- `m`: 現在のロケールのメッセージへの直接アクセス

### 例

```typescript
"use client";
import { useI18n } from "i18n-at";
import { messages } from "@/messages";

export default function ClientComponent() {
  const { t, m } = useI18n(messages);

  return (
    <div>
      <h1>{t(m.title)}</h1>
      <button onClick={() => alert(t(m.clicked))}>{t(m.button.label)}</button>
    </div>
  );
}
```

### 状態管理との組み合わせ

```typescript
"use client";
import { useState } from "react";
import { useI18n } from "i18n-at";

export default function Counter() {
  const { t, m } = useI18n(messages);
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{t(m.count, { value: count })}</p>
      <button onClick={() => setCount(count + 1)}>{t(m.increment)}</button>
    </div>
  );
}
```

## useLocale

クライアントコンポーネントで現在のロケールにアクセスするためのフックです。

### 構文

```typescript
function useLocale(): string;
```

### 戻り値

現在のロケール文字列

### 例

```typescript
"use client";
import { useLocale } from "i18n-at";

export default function LocaleDisplay() {
  const locale = useLocale();

  return (
    <div>
      <p>Current locale: {locale}</p>
      <select
        value={locale}
        onChange={(e) => {
          // 新しいロケールに移動
          window.location.href = `/${e.target.value}`;
        }}
      >
        <option value="en">English</option>
        <option value="ja">日本語</option>
        <option value="zh">中文</option>
      </select>
    </div>
  );
}
```

### 条件付きレンダリング

```typescript
"use client";
import { useLocale, useI18n } from "i18n-at";

export default function LocaleSpecificContent() {
  const locale = useLocale();
  const { t, m } = useI18n(messages);

  return (
    <div>
      {locale === "ja" && <p>{t(m.japanOnly)}</p>}
      {locale === "en" && <p>{t(m.englishOnly)}</p>}
    </div>
  );
}
```

## クライアントコンポーネントパターン

### フォーム処理

```typescript
"use client";
import { useI18n } from "i18n-at";
import { useState } from "react";

export default function ContactForm() {
  const { t, m } = useI18n(messages);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const newErrors = {};
    if (!formData.get("email")) {
      newErrors.email = t(m.errors.emailRequired);
    }

    setErrors(newErrors);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" placeholder={t(m.placeholders.email)} />
      {errors.email && <span>{errors.email}</span>}
      <button type="submit">{t(m.submit)}</button>
    </form>
  );
}
```

### リアルタイム更新

```typescript
"use client";
import { useI18n } from "i18n-at";
import { useEffect, useState } from "react";

export default function LiveStatus() {
  const { t, m } = useI18n(messages);
  const [status, setStatus] = useState("offline");

  useEffect(() => {
    const ws = new WebSocket("/api/status");
    ws.onmessage = (event) => {
      setStatus(event.data);
    };
    return () => ws.close();
  }, []);

  return (
    <div>
      <p>{t(m.status[status])}</p>
    </div>
  );
}
```

### コンポーネント配列

```typescript
"use client";
import { useI18n } from "i18n-at";

export default function FeatureList() {
  const { t, m } = useI18n(messages);

  const features = [
    { id: 1, key: m.features.speed },
    { id: 2, key: m.features.security },
    { id: 3, key: m.features.scalability },
  ];

  return (
    <ul>
      {features.map((feature) => (
        <li key={feature.id}>{t(feature.key)}</li>
      ))}
    </ul>
  );
}
```

## パフォーマンスのヒント

### メモ化

```typescript
"use client";
import { useI18n } from "i18n-at";
import { useMemo } from "react";

export default function ExpensiveComponent({ data }) {
  const { t, m } = useI18n(messages);

  const processedData = useMemo(
    () =>
      data.map((item) => ({
        ...item,
        label: t(m.labels[item.type]),
      })),
    [data, t, m]
  );

  return <DataGrid data={processedData} />;
}
```

### 再レンダリングの回避

```typescript
"use client";
import { useI18n } from "i18n-at";
import { memo } from "react";

const TranslatedButton = memo(function TranslatedButton({
  messageKey,
  onClick,
}: {
  messageKey: any;
  onClick: () => void;
}) {
  const { t } = useI18n(messages);
  return <button onClick={onClick}>{t(messageKey)}</button>;
});
```

## エラーバウンダリ

```typescript
"use client";
import { Component, ReactNode } from "react";
import { useI18n } from "i18n-at";

function ErrorFallback() {
  const { t, m } = useI18n(messages);
  return <div>{t(m.errors.generic)}</div>;
}

export class I18nErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

## ベストプラクティス

1. **クライアントコンポーネントにはプロバイダーが必要** - `useI18n`や`useLocale`フックを使用する際は`I18nClientProvider`が必要です
2. **プロバイダーを適切に配置** - クライアントコンポーネントフックが必要なアプリの部分のみをラップする
3. **インラインでのメッセージ定義を避ける** - コンポーネントの外でメッセージを定義する
4. **メモ化を賢く使用** - 高コストな翻訳操作をメモ化する

## 次のステップ

- [サーバー関数](/ja-jp/api/server-functions)を学ぶ
- [コア関数](/ja-jp/api/core-functions)を探る
- [型定義](/ja-jp/api/types)を理解する
