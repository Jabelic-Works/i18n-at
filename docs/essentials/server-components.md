# Server Components

Learn how to use i18n-at with Next.js Server Components for optimal performance.

## Basic Usage

In Server Components, use the `getI18n` function:

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
      <p>{t(m.description)}</p>
    </div>
  );
}
```

## Async Components

Server Components can be async, allowing you to fetch data alongside translations:

```typescript
import { getI18n } from "i18n-at";
import { messages } from "@/messages";

export default async function ProductPage({
  params: { locale, id },
}: {
  params: { locale: string; id: string };
}) {
  const { t, m } = getI18n(messages, locale);

  // Fetch data in parallel with preparing translations
  const product = await fetchProduct(id);

  return (
    <div>
      <h1>{t(m.product.title, { name: product.name })}</h1>
      <p>{t(m.product.price, { amount: product.price })}</p>
    </div>
  );
}
```

## Layout Components

Use translations in layout components:

```typescript
// app/[locale]/layout.tsx
import { getI18n } from "i18n-at";
import { messages } from "@/messages";

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
        <h1>{t(m.app.title)}</h1>
      </header>
      <main>{children}</main>
      <footer>
        <p>{t(m.app.copyright)}</p>
      </footer>
    </div>
  );
}
```

## Metadata

Generate localized metadata for SEO:

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
  };
}
```

## Performance Benefits

Server Components with i18n-at provide several performance advantages:

1. **No JavaScript sent to client** - Translations are rendered on the server
2. **Reduced bundle size** - Only the HTML with translated text is sent
3. **Better SEO** - Search engines see the fully translated content
4. **Faster initial load** - No client-side translation processing

## Best Practices

### 1. Prefer Server Components

When possible, use Server Components for static translated content:

```typescript
// ✅ Good - Server Component for static content
export default function AboutPage({ params: { locale } }) {
  const { t, m } = getI18n(messages, locale);
  return <article>{t(m.about.content)}</article>;
}
```

### 2. Co-locate Messages

Keep messages close to where they're used:

```typescript
// about/messages.ts
export const { messages: aboutMessages } = defineMessages({
  en: { title: "About Us", content: "..." },
  ja: { title: "私たちについて", content: "..." },
});

// about/page.tsx
import { getI18n } from "i18n-at";
import { aboutMessages } from "./messages";

export default function AboutPage({ params: { locale } }) {
  const { t, m } = getI18n(aboutMessages, locale);
  return <h1>{t(m.title)}</h1>;
}
```

### 3. Handle Dynamic Routes

For dynamic routes, ensure locale is properly handled:

```typescript
// app/[locale]/products/[id]/page.tsx
export default function ProductPage({
  params: { locale, id },
}: {
  params: { locale: string; id: string };
}) {
  const { t, m } = getI18n(messages, locale);
  // Use both locale and id parameters
}
```

## Next Steps

- Learn about [Client Components](/essentials/client-components)
- Explore [TypeScript Support](/advanced/typescript-support)

