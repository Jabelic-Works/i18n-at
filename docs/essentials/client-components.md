# Client Components

## Basic Usage

In Client Components, use the `useI18n` hook:

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

Import message information and pass it as arguments to the useI18n hook.

## Getting Current Locale

Use the `useLocale` hook to get the current locale:

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

## Performance Considerations

### Message Splitting

For large applications, we recommend splitting messages by feature:

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
