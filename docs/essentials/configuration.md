# Configuration

<div v-pre>

## Type-Safe Locale Definition

`defineI18nConfig` is a helper function that creates type-safe locale configurations. **Note: This only defines types and doesn't change any runtime behavior.**

1. **Centralize configuration** - Keep all i18n settings in one place
2. **Use meaningful locale codes** - `"en-US"` vs `"en"` based on your needs
3. **Configure fallbacks** - Always set a fallback locale
4. **Leverage type safety** - Use the generated types in your application

```typescript
// i18nconfig.ts
import { defineI18nConfig } from "i18n-at";

export const i18nConfig = defineI18nConfig({
  locales: {
    "en-US": { name: "English" },
    "ja-JP": { name: "日本語" },
    "zh-CN": { name: "中文" },
  },
  defaultLocale: "en-US",
});
```

## Type Definition Options

### locales

Define the supported locales for type inference:

```typescript
export const i18nConfig = defineI18nConfig({
  locales: {
    "en-US": {
      name: "English",
    },
    "ja-JP": {
      name: "日本語",
    },
    "ar-SA": {
      name: "العربية",
    },
  },
  defaultLocale: "en-US",
});
```

#### LocaleConfig Properties

- `name` (required): Display name for the locale
- `direction` (optional): Text direction - `"ltr"` or `"rtl"`, defaults to `"ltr"`

### defaultLocale

```typescript
export const i18nConfig = defineI18nConfig({
  locales: {
    en: { name: "English" },
    ja: { name: "日本語" },
  },
  defaultLocale: "en", // Must be one of the locale keys
});
```

### fallbackLocale

```typescript
export const i18nConfig = defineI18nConfig({
  locales: {
    en: { name: "English" },
    ja: { name: "日本語" },
    zh: { name: "中文" },
  },
  defaultLocale: "en",
  fallbackLocale: "en", // Fallback to English if locale not found
});
```

### interpolationFormat

```typescript
export const i18nConfig = defineI18nConfig({
  locales: {
    en: { name: "English" },
    ja: { name: "日本語" },
  },
  defaultLocale: "en",
  interpolationFormat: "legacy", // Default: "legacy"
});
```

#### Interpolation Formats

- `"legacy"`: `{name}` - Traditional format
- `"intl"`: `{$name}` - Current i18n-at format (recommended)
- `"double"`: `{{name}}` - Double brace format
- `"none"`: No interpolation support

## Generated Properties

`defineI18nConfig` automatically generates helpful properties:

```typescript
export const i18nConfig = defineI18nConfig({
  locales: {
    en: { name: "English" },
    ja: { name: "日本語" },
  },
  defaultLocale: "en",
});

// Generated properties:
i18nConfig.localeKeys; // ["en", "ja"]
i18nConfig.isValidLocale("en"); // true
i18nConfig.isValidLocale("fr"); // false
i18nConfig.getLocaleConfig("en"); // { name: "English" }
```

### localeKeys

Array of all defined locale keys:

```typescript
const supportedLocales = i18nConfig.localeKeys;
// ["en-US", "ja-JP", "zh-CN"]
```

### isValidLocale

Type guard function to check if a locale is supported:

```typescript
function handleLocale(locale: string) {
  if (i18nConfig.isValidLocale(locale)) {
    // TypeScript knows locale is valid here
    const config = i18nConfig.getLocaleConfig(locale);
    console.log(`Using ${config.name}`);
  } else {
    // Handle unsupported locale
    console.log("Locale not supported");
  }
}
```

### getLocaleConfig

Get the configuration for a specific locale:

```typescript
const enConfig = i18nConfig.getLocaleConfig("en-US");
// { name: "English", direction: "ltr" }
```

## Type Safety

The configuration provides full type safety:

```typescript
// Extract locale types
type SupportedLocale = ExtractConfigLocales<typeof i18nConfig>;
// "en-US" | "ja-JP" | "zh-CN"

// Use in function parameters
function translate(locale: SupportedLocale, key: string) {
  // Implementation
}

// TypeScript will enforce valid locales
translate("en-US", "welcome"); // ✅ Valid
translate("fr-FR", "welcome"); // ❌ TypeScript error
```

## Integration with Next.js

Use the configuration with Next.js routing:

```typescript
// next.config.js
import { i18nConfig } from "./i18nconfig";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Generate static pages for all locales
  generateStaticParams: () =>
    i18nConfig.localeKeys.map((locale) => ({ locale })),
};

export default nextConfig;
```

## Example: Complete Type Definition

```typescript
// i18nconfig.ts
import { defineI18nConfig } from "i18n-at";

export const i18nConfig = defineI18nConfig({
  locales: {
    en: {
      name: "English",
    },
    ja: {
      name: "日本語",
    },
    ar: {
      name: "العربية",
    },
  },
  defaultLocale: "en",
  fallbackLocale: "en",
  interpolationFormat: "intl",
});

// Export types for use throughout the app
export type AppLocale = ExtractConfigLocales<typeof i18nConfig>;
export type AppLocaleConfig = (typeof i18nConfig.locales)[AppLocale];
```

</div>
