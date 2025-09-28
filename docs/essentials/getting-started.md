# Getting Started

This guide will walk you through setting up i18n-at in your Next.js application.

## Basic Setup

### 1. Create Your First Messages

Define messages for your application:

```typescript
// messages.ts
import { defineMessages } from "i18n-at";

export const { messages } = defineMessages({
  en: {
    home: {
      title: "Welcome to i18n-at",
      description: "The type-safe internationalization library",
    },
  },
  ja: {
    home: {
      title: "i18n-atへようこそ",
      description: "タイプセーフな国際化ライブラリ",
    },
  },
});
```

### 2. Use in Server Components

```typescript
// app/[locale]/page.tsx
import { getI18n } from "i18n-at";
import { messages } from "@/messages";

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t, m } = getI18n(messages, locale);

  return (
    <main>
      <h1>{t(m.home.title)}</h1>
      <p>{t(m.home.description)}</p>
    </main>
  );
}
```

### 3. Set up Provider for Client Components

If you plan to use Client Components with `useI18n` or `useLocale` hooks, you need to set up the locale provider:

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

### 4. Use in Client Components

For Client Components, make sure you have the `I18nClientProvider` set up from step 3:

```typescript
// components/Header.tsx
"use client";
import { useI18n } from "i18n-at";
import { messages } from "@/messages";

export default function Header() {
  const { t, m } = useI18n(messages);

  return (
    <header>
      <h1>{t(m.home.title)}</h1>
    </header>
  );
}
```

**Important**: The `useI18n` and `useLocale` hooks require the `I18nClientProvider` to access the current locale. Without the provider, these hooks will not work.

## Key Features

### Type Safety

The `m` object is fully typed, enabling autocomplete and code navigation:

```typescript
const { t, m } = useI18n(messages);

// ✅ TypeScript knows these exist
t(m.home.title);
t(m.home.description);

// ❌ TypeScript error - property doesn't exist
t(m.home.subtitle);
```

```typescript
// F12 on m.home.title jumps to the message definition
<h1>{t(m.home.title)}</h1>
```
