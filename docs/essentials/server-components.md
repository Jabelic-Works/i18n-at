# Server Components

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

Import locale information and message information, and pass them as arguments to the getI18n function.

## Best Practices

### 1. Prefer Server Components

When possible, use Server Components for static translated content:

```typescript
// ✅ Good example - Server Component for static content
export default function AboutPage({ params: { locale } }) {
  const { t, m } = getI18n(messages, locale);
  return <article>{t(m.about.content)}</article>;
}
```

### 2. Message Co-location

Place messages near their usage:

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

### 3. Dynamic Route Handling

In dynamic routes, ensure locale is handled properly:

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
