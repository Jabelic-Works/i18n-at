# Server Functions

Functions for using i18n-at in Next.js Server Components.

## getI18n

Gets translation functions for use in Server Components.

### Syntax

```typescript
function getI18n<T extends Messages>(
  messages: T,
  locale: string
): {
  t: TranslateFunction<T>;
  m: T[keyof T];
};
```

### Parameters

- `messages`: The messages object created by `defineMessages`
- `locale`: The current locale string

### Returns

An object containing:

- `t`: Translation function that accepts message references and parameters
- `m`: Direct access to messages for the current locale

### Example

```typescript
// app/[locale]/page.tsx
import { getI18n } from "i18n-at";
import { messages } from "@/messages";

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t, m } = getI18n(messages, locale);

  return (
    <div>
      <h1>{t(m.title)}</h1>
      <p>{t(m.welcome, { name: "User" })}</p>
    </div>
  );
}
```

### Usage in Async Components

```typescript
export default async function AsyncPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t, m } = getI18n(messages, locale);
  const data = await fetchData();

  return (
    <div>
      <h1>{t(m.pageTitle)}</h1>
      <p>{t(m.dataCount, { count: data.length })}</p>
    </div>
  );
}
```

### Usage in Layouts

```typescript
// app/[locale]/layout.tsx
export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { t, m } = getI18n(messages, locale);

  return (
    <div>
      <header>
        <h1>{t(m.app.name)}</h1>
        <nav>
          <a href={`/${locale}`}>{t(m.nav.home)}</a>
          <a href={`/${locale}/about`}>{t(m.nav.about)}</a>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
```

### Metadata Generation

```typescript
import { Metadata } from "next";
import { getI18n } from "i18n-at";
import { messages } from "@/messages";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { t, m } = getI18n(messages, locale);

  return {
    title: t(m.meta.title),
    description: t(m.meta.description),
    openGraph: {
      title: t(m.meta.ogTitle),
      description: t(m.meta.ogDescription),
    },
  };
}
```

## Server Component Patterns

### Static Generation

```typescript
// Generate static pages for all locales
export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ja" }, { locale: "zh" }];
}

export default function StaticPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t, m } = getI18n(messages, locale);
  return <article>{t(m.content)}</article>;
}
```

### Dynamic Routes

```typescript
// app/[locale]/products/[id]/page.tsx
export default function ProductPage({
  params: { locale, id },
}: {
  params: { locale: string; id: string };
}) {
  const { t, m } = getI18n(messages, locale);

  return (
    <div>
      <h1>{t(m.product.title)}</h1>
      <p>{t(m.product.id, { id })}</p>
    </div>
  );
}
```

### Error Handling

```typescript
export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  try {
    const { t, m } = getI18n(messages, locale);
    return <h1>{t(m.title)}</h1>;
  } catch (error) {
    // Fallback to default locale
    const { t, m } = getI18n(messages, "en");
    return <h1>{t(m.title)}</h1>;
  }
}
```

## Performance Considerations

### Caching

Server Components are cached by default in Next.js:

```typescript
// This component will be cached
export default function CachedPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t, m } = getI18n(messages, locale);
  return <div>{t(m.staticContent)}</div>;
}

// Force dynamic rendering when needed
export const dynamic = "force-dynamic";
```

### Streaming

Use with React Suspense for streaming:

```typescript
import { Suspense } from "react";

function LoadingFallback({ locale }: { locale: string }) {
  const { t, m } = getI18n(messages, locale);
  return <div>{t(m.loading)}</div>;
}

export default function StreamingPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <Suspense fallback={<LoadingFallback locale={locale} />}>
      <AsyncContent locale={locale} />
    </Suspense>
  );
}
```

## Best Practices

1. **Use in Server Components only** - This function is not meant for Client Components
2. **Pass locale explicitly** - Always pass the locale parameter from page props
3. **Handle fallbacks** - Consider fallback behavior for unsupported locales
4. **Optimize for static** - Prefer static generation when possible

## Common Issues

### Locale Not Found

```typescript
// Handle missing locale gracefully
const { t, m } = getI18n(messages, locale || "en");
```

### Type Safety

```typescript
// Ensure locale is valid
type SupportedLocale = keyof typeof messages;

function isValidLocale(locale: string): locale is SupportedLocale {
  return locale in messages;
}

export default function Page({ params: { locale } }) {
  const validLocale = isValidLocale(locale) ? locale : "en";
  const { t, m } = getI18n(messages, validLocale);
  // ...
}
```

## Next Steps

- Learn about [Client Functions](/api/client-functions)
- Explore [Core Functions](/api/core-functions)
- Understand [Type Definitions](/api/types)

