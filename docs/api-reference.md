# 📚 API Reference

Complete reference for all i18n-at functions and utilities.

## Core Package (`i18n-at`)

Core functions and configuration that work in both server and client environments.

### `defineI18nConfig(config)`

Define internationalization configuration with locales, default locale, and formatting options.

**Parameters:**

- `config`: I18nConfig object containing locales, defaultLocale, and optional settings

**Returns:**

- Configuration object with additional helper methods

**Example:**

```typescript
import { defineI18nConfig } from "i18n-at";

const i18nConfig = defineI18nConfig({
  locales: {
    en: { name: "English", direction: "ltr" },
    ja: { name: "日本語", direction: "ltr" },
    ar: { name: "العربية", direction: "rtl" },
  },
  defaultLocale: "en",
  fallbackLocale: "en",
  interpolationFormat: "legacy", // {name} format
});

// Helper methods available
i18nConfig.localeKeys; // ["en", "ja", "ar"]
i18nConfig.isValidLocale("en"); // true
i18nConfig.getLocaleConfig("ja"); // { name: "日本語", direction: "ltr" }
```

### `defineMessages(messages)`

Define internationalized messages with full type safety.

**Parameters:**

- `messages`: Object containing locale keys and their corresponding message objects

**Returns:**

- Object with `messages` property containing the defined messages

**Example:**

```typescript
const { messages } = defineMessages({
  en: { hello: "Hello" },
  ja: { hello: "こんにちは" },
});
```

### `at(locale, messages)`

Get type-safe locale-specific messages for a specific locale.

**Parameters:**

- `locale`: String representing the target locale (e.g., "en-US", "ja-JP")
- `messages`: Messages object returned from `defineMessages`

**Returns:**

- Typed object containing messages for the specified locale

**Example:**

```typescript
const enMessages = at("en-US", messages); // Type: { hello: string }
const jaMessages = at("ja-JP", messages); // Type: { hello: string }
```

### Available Types

This package also exports all the core types:

```typescript
import type {
  LocaleConfig,
  I18nConfig,
  InterpolationFormat,
  ExtractLocales,
  ExtractDefaultLocale,
  ExtractConfigLocales,
  MessageNode,
  Messages,
  ExtractLocaleMessage,
  TranslateFn,
} from "i18n-at";
```

## Server Package (`i18n-at/server`)

Server-side functions for use in React Server Components and API routes.

### `getI18n(messages, locale)`

Server-side translation function that returns both translator and messages.

**Parameters:**

- `messages`: Messages object returned from `defineMessages`
- `locale`: String representing the current locale

**Returns:**

- Object with `t` (translator function) and `m` (messages object) properties

**Example:**

```typescript
import { getI18n } from "i18n-at/server";

const { t, m } = getI18n(messages, "en");
const text = t(m.hello); // "Hello" with full type safety
```

**Usage in Server Components:**

```typescript
// app/[locale]/page.tsx
import { getI18n } from "i18n-at/server";
import { messages } from "./messages";

export default function Page({ params: { locale } }) {
  const { t, m } = getI18n(messages, locale);

  return <h1>{t(m.dashboard.title)}</h1>;
}
```

### Available Functions

```typescript
import { getI18n } from "i18n-at/server";
```

## Client Package (`i18n-at/client`)

Client-side functions and components for use in React Client Components.

### `useI18n(messages)`

Client-side translation hook that returns both translator and messages.

**Parameters:**

- `messages`: Messages object returned from `defineMessages`

**Returns:**

- Object with `t` (translator function) and `m` (messages object) properties

**Example:**

```typescript
const { t, m } = useI18n(messages);
const text = t(m.hello); // Translated text with full type safety
```

**Usage in Client Components:**

```typescript
"use client";
import { useI18n } from "i18n-at/client";
import { messages } from "./messages";

export default function Component() {
  const { t, m } = useI18n(messages);

  return <h1>{t(m.dashboard.title)}</h1>;
}
```

### `useLocale()`

Client-side hook to get the current locale.

**Returns:**

- String representing the current locale

**Example:**

```typescript
"use client";
import { useLocale } from "i18n-at/client";

export default function Component() {
  const locale = useLocale(); // e.g., "en-US"

  return <p>Current locale: {locale}</p>;
}
```

### `I18nClientProvider`

Provider component that sets up the i18n context for client-side components.

**Props:**

- `locale`: String representing the current locale
- `children`: React children to wrap

**Example:**

```typescript
import { I18nClientProvider } from "i18n-at/client";

export default function RootLayout({ children, params: { locale } }) {
  return (
    <html lang={locale}>
      <body>
        <I18nClientProvider locale={locale}>{children}</I18nClientProvider>
      </body>
    </html>
  );
}
```

### `LocaleContext`

React context that provides the current locale. Generally, you should use `useLocale()` instead of accessing this directly.

**Example (Advanced Usage):**

```typescript
import { useContext } from "react";
import { LocaleContext } from "i18n-at/client";

function CustomComponent() {
  const locale = useContext(LocaleContext);
  // Note: useLocale() is preferred over direct context access
  return <div>Current locale: {locale}</div>;
}
```

### Available Functions & Components

```typescript
import {
  useI18n,
  useLocale,
  I18nClientProvider,
  LocaleContext,
} from "i18n-at/client";
```

## Type Utilities

### Configuration Types

#### `LocaleConfig`

Interface for defining locale-specific configuration.

```typescript
interface LocaleConfig {
  name: string; // Display name
  direction?: "ltr" | "rtl"; // Text direction
  dateFormat?: string; // Date format pattern
}
```

#### `I18nConfig<TLocales>`

Interface for the main i18n configuration object.

```typescript
interface I18nConfig<TLocales extends Record<string, LocaleConfig>> {
  locales: TLocales;
  defaultLocale: keyof TLocales;
  fallbackLocale?: keyof TLocales;
  interpolationFormat?: InterpolationFormat;
}
```

#### `InterpolationFormat`

Type for supported interpolation formats.

```typescript
type InterpolationFormat = "none" | "intl" | "legacy" | "double";
// "none" = no interpolation
// "intl" = {$name} format
// "legacy" = {name} format
// "double" = {{name}} format
```

### Message Types

#### `MessageNode`

Type for message structure - can be a string or nested object.

```typescript
type MessageNode = string | { [key: string]: MessageNode };
```

#### `Messages<T, TLocales>`

Type for the complete messages object with all locales.

```typescript
type Messages<T extends MessageNode, TLocales extends string> = Record<
  TLocales,
  T
>;
```

#### `TranslateFn`

Type for the translation function.

```typescript
type TranslateFn = (
  key: string,
  params?: Record<string, string | number>
) => string;
```

### Type Extraction Utilities

#### `ExtractConfigLocales<T>`

Extract locale types from a messages configuration.

**Example:**

```typescript
const { messages } = defineMessages({
  en: { hello: "Hello" },
  ja: { hello: "こんにちは" },
  zh: { hello: "你好" },
});

export type AppLocale = ExtractConfigLocales<typeof messages>;
// AppLocale = "en" | "ja" | "zh"
```

#### `ExtractLocales<T>`

Extract locale union type from an I18nConfig.

**Example:**

```typescript
const config = defineI18nConfig({
  locales: { en: { name: "English" }, ja: { name: "日本語" } },
  defaultLocale: "en",
});

type Locales = ExtractLocales<typeof config>;
// Locales = "en" | "ja"
```

#### `ExtractDefaultLocale<T>`

Extract the default locale type from an I18nConfig.

**Example:**

```typescript
const config = defineI18nConfig({
  locales: { en: { name: "English" }, ja: { name: "日本語" } },
  defaultLocale: "en",
});

type DefaultLocale = ExtractDefaultLocale<typeof config>;
// DefaultLocale = "en"
```

#### `ExtractLocaleMessage<T, TLocale>`

Extract message type for a specific locale.

**Example:**

```typescript
const { messages } = defineMessages({
  en: { greeting: "Hello" },
  ja: { greeting: "こんにちは" },
});

type EnglishMessages = ExtractLocaleMessage<typeof messages, "en">;
// EnglishMessages = { greeting: string }
```

## Message Interpolation

The `t` function supports variable interpolation using the `{$variableName}` syntax:

**Message Definition:**

```typescript
const { messages } = defineMessages({
  en: {
    greeting: "Hello, {$name}!",
    itemCount: "You have {$count} items",
  },
});
```

**Usage:**

```typescript
const { t, m } = getI18n(messages, "en");

// Simple interpolation
t(m.greeting, { name: "Alice" }); // "Hello, Alice!"

// Multiple variables
t(m.itemCount, { count: 5 }); // "You have 5 items"
```

## TypeScript Integration

i18n-at provides full TypeScript support:

- **Message autocomplete**: Full IntelliSense for all your message paths
- **Parameter validation**: Type checking for interpolation parameters
- **Locale validation**: Compile-time checks for valid locale strings
- **IDE navigation**: F12 jumping to message definitions

**Example of type safety:**

```typescript
const { t, m } = useI18n(messages);

// ✅ This works - valid message path
t(m.dashboard.title);

// ❌ TypeScript error - invalid path
t(m.dashboard.nonexistent);

// ❌ TypeScript error - missing required parameter
t(m.greeting); // Missing 'name' parameter

// ✅ This works - all parameters provided
t(m.greeting, { name: "Alice" });
```
