# Type Definitions

Complete type reference for i18n-at.

## Core Types

### MessageNode

```typescript
interface MessageNode {
  [key: string]: string | MessageNode;
}
```

Base interface for message structure.

### Messages

```typescript
type Messages<T extends MessageNode, TLocales extends string = string> = {
  [L in TLocales]: T;
};
```

Type for defining messages across multiple locales.

### TranslateFn

```typescript
type TranslateFn<K extends string = string> = (
  key: K | string,
  params?: Record<string, string | number>
) => string;
```

Function type for translating messages.

### ExtractLocaleMessage

```typescript
type ExtractLocaleMessage<
  TMessages extends Messages<MessageNode, string>,
  TLocale extends string
> = TLocale extends keyof TMessages ? TMessages[TLocale] : never;
```

Extracts message type for a specific locale.

## Configuration Types

### LocaleConfig

```typescript
interface LocaleConfig {
  name: string;
  direction?: "ltr" | "rtl";
  dateFormat?: string;
}
```

Configuration for a single locale.

### I18nConfig

```typescript
interface I18nConfig<TLocales extends Record<string, LocaleConfig>> {
  locales: TLocales;
  defaultLocale: keyof TLocales;
  fallbackLocale?: keyof TLocales;
  interpolationFormat?: InterpolationFormat;
}
```

Complete i18n configuration.

### InterpolationFormat

```typescript
type InterpolationFormat = "none" | "intl" | "legacy" | "double";
```

Supported interpolation formats.

### ExtractLocales

```typescript
type ExtractLocales<T> = T extends I18nConfig<infer U> ? keyof U : never;
```

Extracts locale union type from configuration.

### ExtractDefaultLocale

```typescript
type ExtractDefaultLocale<T> = T extends I18nConfig<infer U>
  ? T["defaultLocale"]
  : never;
```

Extracts default locale from configuration.

### ExtractConfigLocales

```typescript
type ExtractConfigLocales<T> = T extends ReturnType<
  typeof defineI18nConfig<infer U extends Record<string, LocaleConfig>>
>
  ? keyof U
  : never;
```

Extracts locale union from `defineI18nConfig` result.

## Next Steps

- Explore [Core Functions](/api/core-functions)
- Learn about [Server Functions](/api/server-functions)
- Understand [Client Functions](/api/client-functions)
