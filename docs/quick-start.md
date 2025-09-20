# 🚀 Quick Start

Get started with i18n-at in minutes! This guide will walk you through the basic setup and usage.

## Installation

```bash
npm install i18n-at
```

## Step 1: Define Messages

Create your messages right where you use them:

```typescript
// messages.ts
import { defineMessages, at } from "i18n-at";

export const { messages } = defineMessages({
  en: {
    dashboard: {
      title: "Dashboard",
      welcome: "Welcome, {$name}!",
    },
  },
  ja: {
    dashboard: {
      title: "ダッシュボード",
      welcome: "{$name} さん、ようこそ！",
    },
  },
  zh: {
    dashboard: {
      title: "仪表板",
      welcome: "欢迎，{$name}！",
    },
  },
});
```

## Step 2: Server Components

Use in Next.js Server Components:

```typescript
// app/[locale]/page.tsx
import { getI18n } from "i18n-at";
import { messages } from "./messages";

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t, m } = getI18n(messages, locale); // Type-safe & IDE jumping!

  return (
    <div>
      <h1>{t(m.dashboard.title)}</h1>
      <p>{t(m.dashboard.welcome, { name: "User" })}</p>
    </div>
  );
}
```

## Step 3: Client Components

Use in Client Components with hooks:

```typescript
// components/Dashboard.tsx
"use client";
import { useI18n, useLocale } from "i18n-at";
import { messages } from "./messages";

export default function Dashboard() {
  const locale = useLocale();
  const { t, m } = useI18n(messages); // IDE jumping works!

  return (
    <div>
      <h1>{t(m.dashboard.title)}</h1>
      <p>{t(m.dashboard.welcome, { name: "User" })}</p>
    </div>
  );
}
```

## Step 4: Provider Setup

Set up the i18n provider in your app:

```typescript
// app/layout.tsx
import { I18nClientProvider } from "@i18n-at";

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

## 🎉 That's It!

You now have a fully type-safe internationalization setup! The key benefits you'll notice immediately:

- ✅ **Full type safety** - TypeScript will catch translation errors
- ✅ **IDE jumping** - Press F12 on any message to jump to its definition
- ✅ **Co-location** - Messages are defined where they're used
- ✅ **Auto-completion** - Full IntelliSense support for all your messages

## Next Steps

- [Learn about the API Reference](/api-reference)
- [Understand why co-location matters](/why-this-library)
- [Explore advanced usage patterns](/advanced-usage)

