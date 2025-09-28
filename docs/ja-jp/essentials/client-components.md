# クライアントコンポーネント

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

message 情報は import useI18n フックに引数として渡します。

## 現在のロケールの取得

`useLocale`フックを使用して現在のロケールを取得できます：

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

## パフォーマンスの考慮事項

### メッセージの分割

大規模なアプリケーションでは、機能ごとにメッセージを分割することを推奨します：

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
