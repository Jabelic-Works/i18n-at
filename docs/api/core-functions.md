# Core Functions

Core functions for defining and managing messages in i18n-at.

## defineMessages

Creates type-safe message definitions supporting multiple locales.

### Syntax

```typescript
function defineMessages<T extends Messages>(
  messages: T
): {
  messages: T;
  at: <K extends keyof T>(locale: K, messages: T) => T[K];
};
```

### Parameters

- `messages`: Object containing message definitions for each locale

### Returns

Object containing:

- `messages`: Original message object with full type information
- `at`: Function to extract messages for a specific locale

### Example

```typescript
import { defineMessages } from "i18n-at";

const { messages, at } = defineMessages({
  en: {
    greeting: "Hello, {$name}!",
    farewell: "Goodbye!",
  },
  ja: {
    greeting: "こんにちは、{$name}さん！",
    farewell: "さようなら！",
  },
});

// Extract messages for specific locale
const enMessages = at("en", messages); // { greeting: "Hello, {$name}!", farewell: "Goodbye!" }
const jaMessages = at("ja", messages); // { greeting: "こんにちは、{$name}さん！", farewell: "さようなら！" }
```

### Type Safety

This function provides complete type inference:

```typescript
const { messages } = defineMessages({
  en: {
    user: {
      name: "Name",
      email: "Email",
    },
  },
});

// TypeScript recognizes the exact structure
type MessageType = typeof messages;
```

## defineI18nConfig

Creates i18n configuration objects with type safety and helper functions.

### Syntax

```typescript
function defineI18nConfig<T extends Record<string, LocaleConfig>>(
  config: I18nConfig<T>
): ConfigResult<T>;
```

### Example

```typescript
import { defineI18nConfig } from "i18n-at";

export const i18nConfig = defineI18nConfig({
  locales: {
    en: { name: "English" },
    ja: { name: "日本語" },
  },
  defaultLocale: "en",
  fallbackLocale: "en",
  interpolationFormat: "intl",
});

// Generated properties
i18nConfig.localeKeys; // ["en", "ja"]
i18nConfig.isValidLocale("en"); // true
i18nConfig.getLocaleConfig("en"); // { name: "English" }
```

## at

Extracts messages for a specific locale from message definitions.

### Syntax

```typescript
function at<T extends Messages, K extends keyof T>(
  locale: K,
  messages: T
): T[K];
```

### Example

```typescript
import { defineMessages, at } from "i18n-at";

const { messages } = defineMessages({
  en: { welcome: "Welcome!" },
  ja: { welcome: "ようこそ！" },
});

// Use standalone at function
const enMessages = at("en", messages); // { welcome: "Welcome!" }
const jaMessages = at("ja", messages); // { welcome: "ようこそ！" }
```
