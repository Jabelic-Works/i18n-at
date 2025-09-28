# クライアント関数

## I18nClientProvider

`useI18n`および`useLocale`フックを使用するクライアントコンポーネントにロケールコンテキストを提供するプロバイダーコンポーネントです。

### 引数

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

export default function Layout({
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
