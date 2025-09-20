# Client Components

Learn how to use i18n-at in Client Components with React hooks.

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

## Interactive Examples

### Form with Validation

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

    // Submit form
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

### Dynamic Content Updates

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

## State Management Integration

i18n-at works seamlessly with state management libraries:

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

## Performance Considerations

### 1. Message Splitting

For large applications, split messages by feature:

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

### 2. Memoization

For expensive computations, use React's memoization:

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
    // Render table with formattedData
  );
}
```

## Common Patterns

### Conditional Rendering

```typescript
"use client";
import { useI18n } from "i18n-at";
import { messages } from "@/messages";

export default function StatusMessage({ isLoggedIn }: { isLoggedIn: boolean }) {
  const { t, m } = useI18n(messages);

  return <p>{isLoggedIn ? t(m.status.loggedIn) : t(m.status.loggedOut)}</p>;
}
```

### Event Handlers

```typescript
"use client";
import { useI18n } from "i18n-at";
import { messages } from "@/messages";

export default function ActionButtons() {
  const { t, m } = useI18n(messages);

  const handleSave = () => {
    // Save logic
    alert(t(m.notifications.saved));
  };

  const handleDelete = () => {
    if (confirm(t(m.confirmations.delete))) {
      // Delete logic
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

## Next Steps

- Learn about [Server Components](/essentials/server-components)
- Explore [TypeScript Support](/advanced/typescript-support)
- Understand [Performance Optimization](/advanced/optimization)

