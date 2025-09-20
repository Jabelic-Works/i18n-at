# TypeScript Support

i18n-at provides first-class TypeScript support, ensuring type safety throughout your internationalization workflow.

## Type-Safe Message Access

All message paths are fully typed:

```typescript
const { messages } = defineMessages({
  en: {
    user: {
      profile: {
        name: "Name",
        email: "Email",
      },
    },
  },
});

const { t, m } = useI18n(messages);

// ✅ TypeScript provides autocomplete for all paths
t(m.user.profile.name);
t(m.user.profile.email);

// ❌ TypeScript error - property doesn't exist
t(m.user.profile.phone);
//               ^^^^^ Property 'phone' does not exist
```

## Parameter Type Safety

TypeScript ensures you provide all required interpolation parameters:

```typescript
const { messages } = defineMessages({
  en: {
    greeting: "Hello, {$name}!",
    orderStatus: "Order {$id} is {$status}",
  },
});

const { t, m } = useI18n(messages);

// ✅ TypeScript knows the exact parameter types
t(m.greeting, { name: "Alice" });
t(m.orderStatus, { id: "123", status: "shipped" });

// ❌ TypeScript error - missing required parameters
t(m.greeting);
// Error: Argument of type '{}' is not assignable to parameter

// ❌ TypeScript error - wrong parameter names
t(m.greeting, { username: "Alice" });
// Error: Object literal may only specify known properties
```

## Strict Type Checking

### Message Structure Validation

Ensure all locales have the same message structure:

```typescript
// Define a type for your message structure
type MessageStructure = {
  auth: {
    login: string;
    logout: string;
    errors: {
      invalidCredentials: string;
      networkError: string;
    };
  };
  dashboard: {
    title: string;
    welcome: string;
  };
};

// Use satisfies to ensure each locale matches the structure
const { messages } = defineMessages({
  en: {
    auth: {
      login: "Login",
      logout: "Logout",
      errors: {
        invalidCredentials: "Invalid credentials",
        networkError: "Network error",
      },
    },
    dashboard: {
      title: "Dashboard",
      welcome: "Welcome back!",
    },
  } satisfies MessageStructure,

  ja: {
    auth: {
      login: "ログイン",
      logout: "ログアウト",
      errors: {
        invalidCredentials: "認証情報が無効です",
        networkError: "ネットワークエラー",
      },
    },
    dashboard: {
      title: "ダッシュボード",
      welcome: "おかえりなさい！",
    },
  } satisfies MessageStructure,
});
```

### Custom Type Guards

Create type guards for dynamic message access:

```typescript
const { messages } = defineMessages({
  en: {
    errors: {
      notFound: "Not found",
      unauthorized: "Unauthorized",
      serverError: "Server error",
    },
  },
});

// Type guard for error codes
type ErrorCode = "notFound" | "unauthorized" | "serverError";

function isValidErrorCode(code: string): code is ErrorCode {
  return ["notFound", "unauthorized", "serverError"].includes(code);
}

// Usage with type safety
function showError(errorCode: string) {
  const { t, m } = useI18n(messages);

  if (isValidErrorCode(errorCode)) {
    return t(m.errors[errorCode]); // TypeScript knows this is safe
  }

  return t(m.errors.serverError); // Fallback
}
```

## Generic Components

Create type-safe generic components:

```typescript
import { defineMessages, Messages } from "i18n-at";

// Generic component that accepts any message structure
function TranslatedText<T extends Messages>({
  messages,
  messagePath,
  params,
}: {
  messages: T;
  messagePath: (m: T[keyof T]) => string;
  params?: Record<string, string | number>;
}) {
  const { t, m } = useI18n(messages);
  return <span>{t(messagePath(m), params)}</span>;
}

// Usage
const { messages } = defineMessages({
  en: { hello: "Hello, {$name}!" },
});

<TranslatedText
  messages={messages}
  messagePath={(m) => m.hello}
  params={{ name: "World" }}
/>;
```

## Type Inference

i18n-at automatically infers types from your message definitions:

```typescript
const { messages } = defineMessages({
  en: {
    simple: "Simple message",
    withParam: "Hello, {$name}!",
    multipleParams: "{$count} items in {$category}",
  },
});

// TypeScript infers:
// - m.simple: no parameters needed
// - m.withParam: requires { name: string | number }
// - m.multipleParams: requires { count: string | number, category: string | number }

const { t, m } = useI18n(messages);

// TypeScript enforces correct usage based on inference
t(m.simple); // ✅ No parameters needed
t(m.withParam, { name: "Al" }); // ✅ Correct parameter
t(m.multipleParams, {
  // ✅ All parameters provided
  count: 5,
  category: "Electronics",
});
```

## Advanced Types

### Conditional Types

Use conditional types for flexible message handling:

```typescript
type LocalizedMessage<T> = T extends { $params: infer P }
  ? (params: P) => string
  : () => string;

// This allows for more advanced type manipulations
```

### Utility Types

Create utility types for common patterns:

```typescript
// Extract all message keys
type MessageKeys<T> = T extends Record<string, any>
  ? {
      [K in keyof T]: T[K] extends string ? K : MessageKeys<T[K]>;
    }[keyof T]
  : never;

// Get parameter types for a specific message
type MessageParams<T> = T extends `${string}{$${infer Param}}${infer Rest}`
  ? { [K in Param]: string | number } & MessageParams<Rest>
  : {};
```

## Advanced Type Patterns

### Strict Message Types

Create strict message type definitions:

```typescript
type StrictMessages<T extends Messages> = {
  [K in keyof T]: {
    [MK in keyof T[K]]: T[K][MK] extends string
      ? T[K][MK]
      : T[K][MK] extends object
      ? StrictMessages<{ _: T[K][MK] }>["_"]
      : never;
  };
};

// Usage
const messages = defineMessages({
  en: { greeting: "Hello" },
  ja: { greeting: "こんにちは" },
} satisfies StrictMessages<{ en: any; ja: any }>);
```

### Locale-Aware Types

Create types that are aware of available locales:

```typescript
type LocaleMessages<T extends Messages> = {
  [K in keyof T]: {
    locale: K;
    messages: T[K];
  };
}[keyof T];

// Usage
type AvailableLocales = LocaleMessages<typeof messages>;
// { locale: "en"; messages: {...} } | { locale: "ja"; messages: {...} }
```

### Message Path Types

Generate dot-notation paths for messages:

```typescript
type MessagePath<T, P extends string = ""> = T extends object
  ? {
      [K in keyof T]: T[K] extends string
        ? `${P}${K & string}`
        : MessagePath<T[K], `${P}${K & string}.`>;
    }[keyof T]
  : never;

// Usage
type Paths = MessagePath<{ user: { name: string; email: string } }>;
// "user.name" | "user.email"
```

## Type Guards

### isValidLocale

Type guard for checking valid locales:

```typescript
function isValidLocale<T extends Messages>(
  locale: string,
  messages: T
): locale is keyof T {
  return locale in messages;
}

// Usage
if (isValidLocale(locale, messages)) {
  // TypeScript knows locale is valid here
  const { t, m } = getI18n(messages, locale);
}
```

### hasParameters

Type guard for checking if a message has parameters:

```typescript
function hasParameters<T extends string>(
  message: T
): message is T & { __params: ExtractParams<T> } {
  return message.includes("{$");
}
```

## Configuration Type Utilities

### Extract Types from Configuration

```typescript
const config = defineI18nConfig({
  locales: {
    en: { name: "English" },
    ja: { name: "日本語" },
  },
  defaultLocale: "en",
});

// Extract supported locales
type SupportedLocale = ExtractConfigLocales<typeof config>;
// "en" | "ja"

// Extract default locale
type DefaultLocale = ExtractDefaultLocale<typeof config>;
// "en"

// Extract all locales from raw config
type AllLocales = ExtractLocales<typeof config>;
// "en" | "ja"
```

### Generic Constraints

```typescript
type MessageConstraint = Record<string, Record<string, any>>;
type LocaleConstraint<T extends Messages> = keyof T & string;

function processMessages<T extends MessageConstraint>(messages: T) {
  // Process messages with type safety
}

function validateLocale<T extends Messages>(
  locale: string,
  messages: T
): LocaleConstraint<T> | undefined {
  return locale in messages ? (locale as LocaleConstraint<T>) : undefined;
}
```

## Best Practices

1. **Use `satisfies` for structure validation** - Ensures all locales have the same shape
2. **Leverage type inference** - Let TypeScript infer types from your definitions
3. **Create type guards for dynamic access** - Safely handle dynamic message keys
4. **Use generic components** - Build reusable, type-safe translation components
5. **Extract configuration types** - Use utility types for locale management

## Next Steps

- Explore [Component Patterns](/advanced/component-patterns)
- Learn about [Performance Optimization](/advanced/optimization)
