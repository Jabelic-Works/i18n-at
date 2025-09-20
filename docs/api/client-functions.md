# Client Functions

Functions and hooks for using i18n-at in Client Components.

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

### Nested Providers

```typescript
// Can be nested for different parts of the app
<I18nClientProvider locale={mainLocale}>
  <MainApp />
  <I18nClientProvider locale={widgetLocale}>
    <Widget />
  </I18nClientProvider>
</I18nClientProvider>
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

- `messages`: The messages object created by `defineMessages`

### Returns

- `t`: Translation function that accepts message references and parameters
- `m`: Direct access to messages for the current locale

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

### With State Management

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

The current locale string

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

### Conditional Rendering

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

## Client Component Patterns

### Form Handling

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

### Real-time Updates

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

### Component Arrays

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

## Performance Tips

### Memoization

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

### Avoiding Re-renders

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

## Error Boundaries

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

## Best Practices

1. **Provider is required for Client Components** - `I18nClientProvider` is required when using `useI18n` or `useLocale` hooks
2. **Place provider appropriately** - Wrap only the parts of your app that need Client Component hooks
3. **Avoid inline message definitions** - Define messages outside components
4. **Use memoization wisely** - Memoize expensive translation operations

## Next Steps

- Learn about [Server Functions](/api/server-functions)
- Explore [Core Functions](/api/core-functions)
- Understand [Type Definitions](/api/types)
