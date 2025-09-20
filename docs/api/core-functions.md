# Core Functions

Core functions for defining and managing messages in i18n-at.

## defineMessages

Creates a type-safe message definition with support for multiple locales.

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

- `messages`: An object containing message definitions for each locale

### Returns

An object containing:

- `messages`: The original messages object with full type information
- `at`: A function to extract messages for a specific locale

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

// Extract messages for a specific locale
const enMessages = at("en", messages); // { greeting: "Hello, {$name}!", farewell: "Goodbye!" }
const jaMessages = at("ja", messages); // { greeting: "こんにちは、{$name}さん！", farewell: "さようなら！" }
```

### Type Safety

The function provides full type inference:

```typescript
const { messages } = defineMessages({
  en: {
    user: {
      name: "Name",
      email: "Email",
    },
  },
});

// TypeScript knows the exact structure
type MessageType = typeof messages;
// {
//   en: {
//     user: {
//       name: string;
//       email: string;
//     }
//   }
// }
```

## defineI18nConfig

Creates a configuration object for your i18n setup with type safety and helper functions.

### Syntax

```typescript
function defineI18nConfig<T extends Record<string, LocaleConfig>>(
  config: I18nConfig<T>
): ConfigResult<T>;
```

### Parameters

- `config`: Configuration object containing locales, default locale, and options

### Returns

The configuration object with additional generated properties:

- `localeKeys`: Array of all locale keys
- `isValidLocale`: Type guard function for checking valid locales
- `getLocaleConfig`: Function to get configuration for a specific locale

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

### Configuration Types

```typescript
interface LocaleConfig {
  name: string;
  direction?: "ltr" | "rtl";
  dateFormat?: string;
}

interface I18nConfig<TLocales extends Record<string, LocaleConfig>> {
  locales: TLocales;
  defaultLocale: keyof TLocales;
  fallbackLocale?: keyof TLocales;
  interpolationFormat?: InterpolationFormat;
}

type InterpolationFormat = "none" | "intl" | "legacy" | "double";
```

## at

Extracts messages for a specific locale from a message definition.

### Syntax

```typescript
function at<T extends Messages, K extends keyof T>(
  locale: K,
  messages: T
): T[K];
```

### Parameters

- `locale`: The locale key to extract messages for
- `messages`: The messages object created by `defineMessages`

### Returns

The messages for the specified locale

### Example

```typescript
import { defineMessages, at } from "i18n-at";

const { messages } = defineMessages({
  en: { welcome: "Welcome!" },
  ja: { welcome: "ようこそ！" },
});

// Use the standalone at function
const enMessages = at("en", messages); // { welcome: "Welcome!" }
const jaMessages = at("ja", messages); // { welcome: "ようこそ！" }

// Or use the at function returned by defineMessages
const { at: getLocaleMessages } = defineMessages({
  /* ... */
});
const localeMessages = getLocaleMessages("en", messages);
```

### Dynamic Locale Selection

```typescript
function getMessagesForLocale(locale: string) {
  const supportedLocales = ["en", "ja", "zh"] as const;
  const selectedLocale = supportedLocales.includes(locale as any)
    ? locale
    : "en";

  return at(selectedLocale as any, messages);
}
```

## Type Definitions

### Messages Type

```typescript
type Messages = Record<string, any>;
```

Base type for message definitions. Allows nested objects with string values at the leaves.

### ExtractParams Type

```typescript
type ExtractParams<T extends string> = /* ... */;
```

Extracts parameter names from message strings containing `{$paramName}` placeholders.

### Example

```typescript
type Params = ExtractParams<"Hello, {$name}! You have {$count} messages">;
// { name: string | number; count: string | number }
```

## Best Practices

1. **Define messages at module level** - Avoid defining messages inside components
2. **Use const assertions** - For stricter type checking when needed
3. **Organize by feature** - Group related messages together
4. **Keep messages flat when possible** - Deep nesting can make messages harder to manage

## Common Patterns

### Module-Level Definitions

```typescript
// messages.ts
export const { messages } = defineMessages({
  en: {
    /* ... */
  },
  ja: {
    /* ... */
  },
});

// component.tsx
import { messages } from "./messages";
```

### Feature-Based Organization

```typescript
// features/auth/messages.ts
export const { messages: authMessages } = defineMessages({
  en: {
    login: "Login",
    logout: "Logout",
  },
});

// features/dashboard/messages.ts
export const { messages: dashboardMessages } = defineMessages({
  en: {
    title: "Dashboard",
    welcome: "Welcome back!",
  },
});
```

## Next Steps

- Learn about [Server Functions](/api/server-functions)
- Explore [Client Functions](/api/client-functions)
- Understand [Type Definitions](/api/types)
