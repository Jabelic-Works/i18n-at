# i18n-at

🌍 **Type-safe internationalization tool for Next.js App Router with co-location and IDE code jumping**

## ✨ Features

- 🏗️ **Co-location First** - Define messages right where they're used
- 🛡️ **100% Type-safe** - Full TypeScript support with strict typing
- 🔍 **IDE Code Jumping** - Jump directly to message definitions

## 🚀 Quick Start

### Installation

```bash
npm install i18n-at
```

### 1. Define Messages

```typescript
// messages.ts
import { defineMessages, at } from "i18n-at";

export const { messages } = defineMessages({
  en: {
    dashboard: {
      title: "Dashboard",
      welcome: "Welcome, {name}!",
    },
  },
  ja: {
    dashboard: {
      title: "ダッシュボード",
      welcome: "{name} さん、ようこそ！",
    },
  },
  zh: {
    dashboard: {
      title: "仪表板",
      welcome: "欢迎，{name}！",
    },
  },
});
export type AppLocale = ExtractConfigLocales<typeof i18nConfig>;
```

### 2. Server Components

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

### 3. Client Components

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

### 4. Provider Setup

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

## 📚 API Reference

### Core Functions

#### `defineMessages(messages)`

Define internationalized messages with type safety.

```typescript
const { messages } = defineMessages({
  en: { hello: "Hello" },
  ja: { hello: "こんにちは" },
});
```

#### `at(locale, messages)`

Get type-safe locale-specific messages.

```typescript
const enMessages = at("en", messages); // Type: { hello: string }
const jaMessages = at("ja", messages); // Type: { hello: string }
```

#### `getI18n(messages, locale)`

Server-side translation function that returns both translator and messages.

```typescript
const { t, m } = getI18n(messages, "en");
const text = t(m.hello); // "Hello" with type safety
```

#### `useI18n(messages)`

Client-side translation hook that returns both translator and messages.

```typescript
const { t, m } = useI18n(messages);
const text = t(m.hello); // Translated text with type safety
```

## 🎯 Why This Library?

### 🏗️ **Co-location First**: Keep Messages Close to Usage

Unlike traditional i18n solutions that force you to manage translations in separate files, i18n-at lets you **define and use messages in the same place**:

```typescript
// ✅ Messages defined right where they're used
export const { messages } = defineMessages({
  en: {
    dashboard: {
      title: "Dashboard",
      welcome: "Welcome, {name}!",
    },
  },
  ja: {
    dashboard: {
      title: "ダッシュボード",
      welcome: "{name} さん、ようこそ！",
    },
  },
});

// Used immediately in the same component
const m = at(locale, messages);
return <h1>{t(m.dashboard.title)}</h1>;
```

### 🔺 Traditional Approach Problems

```typescript
// ❌ Separate files, hard to maintain
// locales/en.json: { "dashboard.title": "Dashboard" }
// locales/ja.json: { "dashboard.title": "ダッシュボード" }

// No type safety, no IDE jumping
t("dashboard.title"); // ← String literal, error-prone
```

### ✅ Our Co-location Benefits

- 🎯 **Easy Maintenance**: Messages live next to their usage
- 🔍 **IDE Code Jumping**: F12 jumps directly to message definitions
- 🛡️ **100% Type-safe**: Full TypeScript support
- 🧹 **Dead Code Detection**: Unused messages are easily spotted
- ⚡ **Faster Refactoring**: Change component? Messages move with it
- 📝 **1-Line Declaration**: `const { t, m } = useI18n(messages)` - Simple & powerful!

## 🔧 Advanced Usage

### Dynamic Locale Loading

```typescript
// Conditional locale loading
const getMessages = (locale: string) => {
  switch (locale) {
    case "en":
      return at("en", messages);
    case "ja":
      return at("ja", messages);
    default:
      return at("en", messages);
  }
};
```

### Nested Message Structures

```typescript
const { messages } = defineMessages({
  en: {
    auth: {
      login: {
        title: "Sign In",
        form: {
          email: "Email Address",
          password: "Password",
        },
      },
    },
  },
});

// Usage with full autocomplete
t(m.auth.login.form.email); // ← Full IDE support!
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md).

## 📄 License

MIT © Jabelic

---

**Made with ❤️ for type-safe internationalization**
