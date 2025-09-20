# Configuration

Learn how to configure i18n-at for your application using `defineI18nConfig`.

## Basic Configuration

Use `defineI18nConfig` to define your application's internationalization settings:

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

## Configuration Options

### locales

Define the supported locales and their configurations:

```typescript
export const i18nConfig = defineI18nConfig({
  locales: {
    "en-US": {
      name: "English",
      direction: "ltr",
      dateFormat: "MM/dd/yyyy",
    },
    "ja-JP": {
      name: "日本語",
      direction: "ltr",
      dateFormat: "yyyy/MM/dd",
    },
    "ar-SA": {
      name: "العربية",
      direction: "rtl",
      dateFormat: "dd/MM/yyyy",
    },
  },
  defaultLocale: "en-US",
});
```

#### LocaleConfig Properties

- `name` (required): Display name for the locale
- `direction` (optional): Text direction - `"ltr"` or `"rtl"`, defaults to `"ltr"`
- `dateFormat` (optional): Date format pattern for this locale

### defaultLocale

Specify which locale to use as the default:

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

Specify a fallback locale when the requested locale is not available:

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

Configure the interpolation format for message variables:

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
// { name: "English", direction: "ltr", dateFormat: "MM/dd/yyyy" }
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

## Best Practices

1. **Centralize configuration** - Keep all i18n settings in one place
2. **Use meaningful locale codes** - `"en-US"` vs `"en"` based on your needs
3. **Configure fallbacks** - Always set a fallback locale
4. **Leverage type safety** - Use the generated types in your application

## Example: Complete Setup

```typescript
// i18nconfig.ts
import { defineI18nConfig } from "i18n-at";

export const i18nConfig = defineI18nConfig({
  locales: {
    en: {
      name: "English",
      direction: "ltr",
      dateFormat: "MM/dd/yyyy",
    },
    ja: {
      name: "日本語",
      direction: "ltr",
      dateFormat: "yyyy年MM月dd日",
    },
    ar: {
      name: "العربية",
      direction: "rtl",
      dateFormat: "dd/MM/yyyy",
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

## Next Steps

- Learn about [Message Format Syntax](/essentials/message-format-syntax)
- Explore [TypeScript Support](/advanced/typescript-support)

