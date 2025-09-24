# クライアントコンポーネント

React フックを使用してクライアントコンポーネントで i18n-at を使用する方法を学びます。

## 基本的な使用方法

クライアントコンポーネントでは、`useI18n`フックを使用します：

```typescript
"use client";
import { useI18n } from "i18n-at";
import { messages } from "@/messages";

export default function InteractiveComponent() {
  const { t, m } = useI18n(messages);

  return (
    <button onClick={() => alert(t(m.clicked))}>{t(m.button.label)}</button>
  );
}
```

## 現在のロケールの取得

`useLocale`フックを使用して現在のロケールを取得：

```typescript
"use client";
import { useI18n, useLocale } from "i18n-at";
import { messages } from "@/messages";

export default function LocaleDisplay() {
  const locale = useLocale();
  const { t, m } = useI18n(messages);

  return (
    <div>
      <p>{t(m.currentLocale, { locale })}</p>
      <p>Language: {locale === "en" ? "English" : "日本語"}</p>
    </div>
  );
}
```

## インタラクティブな例

### バリデーション付きフォーム

```typescript
"use client";
import { useState } from "react";
import { useI18n } from "i18n-at";
import { messages } from "@/messages";

export default function ContactForm() {
  const { t, m } = useI18n(messages);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.includes("@")) {
      setError(t(m.form.errors.invalidEmail));
      return;
    }

    // フォーム送信
    alert(t(m.form.success));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        {t(m.form.email)}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t(m.form.emailPlaceholder)}
        />
      </label>
      {error && <p className="error">{error}</p>}
      <button type="submit">{t(m.form.submit)}</button>
    </form>
  );
}
```

### 動的コンテンツの更新

```typescript
"use client";
import { useState } from "react";
import { useI18n } from "i18n-at";
import { messages } from "@/messages";

export default function Counter() {
  const { t, m } = useI18n(messages);
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{t(m.counter.current, { count })}</p>
      <button onClick={() => setCount(count + 1)}>
        {t(m.counter.increment)}
      </button>
      <button onClick={() => setCount(0)}>{t(m.counter.reset)}</button>
    </div>
  );
}
```

## 状態管理ライブラリとの統合

i18n-at は状態管理ライブラリとシームレスに動作します：

```typescript
"use client";
import { useI18n } from "i18n-at";
import { useAppSelector } from "@/store";
import { messages } from "@/messages";

export default function CartSummary() {
  const { t, m } = useI18n(messages);
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <h2>{t(m.cart.title)}</h2>
      <p>{t(m.cart.itemCount, { count: cartItems.length })}</p>
      <p>{t(m.cart.total, { amount: totalPrice.toFixed(2) })}</p>
    </div>
  );
}
```

## パフォーマンスの考慮事項

### 1. メッセージの分割

大規模なアプリケーションでは、機能ごとにメッセージを分割：

```typescript
// features/auth/messages.ts
export const { messages: authMessages } = defineMessages({
  en: { login: "Login", logout: "Logout" },
  ja: { login: "ログイン", logout: "ログアウト" },
});

// features/auth/LoginButton.tsx
("use client");
import { useI18n } from "i18n-at";
import { authMessages } from "./messages";

export default function LoginButton() {
  const { t, m } = useI18n(authMessages);
  return <button>{t(m.login)}</button>;
}
```

### 2. メモ化

高コストな計算には React のメモ化を使用：

```typescript
"use client";
import { useMemo } from "react";
import { useI18n } from "i18n-at";
import { messages } from "@/messages";

export default function DataTable({ data }: { data: Item[] }) {
  const { t, m } = useI18n(messages);

  const formattedData = useMemo(() =>
    data.map(item => ({
      ...item,
      status: t(m.statuses[item.status]),
      date: new Intl.DateTimeFormat().format(item.date),
    })),
    [data, t, m]
  );

  return (
    // formattedDataでテーブルをレンダリング
  );
}
```

## 一般的なパターン

### 条件付きレンダリング

```typescript
"use client";
import { useI18n } from "i18n-at";
import { messages } from "@/messages";

export default function StatusMessage({ isLoggedIn }: { isLoggedIn: boolean }) {
  const { t, m } = useI18n(messages);

  return <p>{isLoggedIn ? t(m.status.loggedIn) : t(m.status.loggedOut)}</p>;
}
```

### イベントハンドラー

```typescript
"use client";
import { useI18n } from "i18n-at";
import { messages } from "@/messages";

export default function ActionButtons() {
  const { t, m } = useI18n(messages);

  const handleSave = () => {
    // 保存ロジック
    alert(t(m.notifications.saved));
  };

  const handleDelete = () => {
    if (confirm(t(m.confirmations.delete))) {
      // 削除ロジック
      alert(t(m.notifications.deleted));
    }
  };

  return (
    <>
      <button onClick={handleSave}>{t(m.actions.save)}</button>
      <button onClick={handleDelete}>{t(m.actions.delete)}</button>
    </>
  );
}
```

## 次のステップ

- [サーバーコンポーネント](/ja-jp/essentials/server-components)を学ぶ
- [TypeScript サポート](/ja-jp/advanced/typescript-support)を探る
- [パフォーマンス最適化](/ja-jp/advanced/optimization)を理解する
