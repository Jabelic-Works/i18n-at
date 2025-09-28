# Client Functions

## I18nClientProvider

Provider component that provides locale context to Client Components using `useI18n` and `useLocale` hooks.

### Props

```typescript
interface I18nClientProviderProps {
  locale: string;
  children: React.ReactNode;
}
```

### Example

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

Hook for accessing translation functions in Client Components.

### Syntax

```typescript
function useI18n<T extends Messages>(
  messages: T
): {
  t: TranslateFunction<T>;
  m: T[keyof T];
};
```

### Parameters

- `messages`: Message object created with `defineMessages`

### Returns

- `t`: Translation function that takes message reference and parameters
- `m`: Direct access to messages for current locale

### Example

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

### Combining with State Management

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

Hook for accessing the current locale in Client Components.

### Syntax

```typescript
function useLocale(): string;
```

### Returns

Current locale string

### Example

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
          // Navigate to new locale
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
