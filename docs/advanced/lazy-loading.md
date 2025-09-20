# Lazy Loading

Optimize bundle size by loading translations only when needed.

## Dynamic Imports

Load message modules dynamically:

```typescript
// Instead of static import
// import { messages } from "./messages";

// Use dynamic import
const loadMessages = async (locale: string) => {
  const module = await import(`./messages/${locale}`);
  return module.messages;
};

// Usage in component
function MyComponent({ locale }: { locale: string }) {
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    loadMessages(locale).then(setMessages);
  }, [locale]);

  if (!messages) return <div>Loading translations...</div>;

  const { t, m } = useI18n(messages);
  return <h1>{t(m.title)}</h1>;
}
```

## Route-Based Splitting

Split translations by route for Next.js applications:

```typescript
// app/[locale]/products/messages.ts
export const getProductMessages = async (locale: string) => {
  // Only load the messages for the current locale
  switch (locale) {
    case "en":
      const enModule = await import("./messages/en");
      return enModule.messages;
    case "ja":
      const jaModule = await import("./messages/ja");
      return jaModule.messages;
    default:
      const defaultModule = await import("./messages/en");
      return defaultModule.messages;
  }
};

// app/[locale]/products/page.tsx
import { getProductMessages } from "./messages";

export default async function ProductsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const messages = await getProductMessages(locale);
  const { t, m } = getI18n(messages, locale);

  return <h1>{t(m.title)}</h1>;
}
```

## Feature-Based Splitting

Organize translations by feature and load on demand:

```typescript
// features/checkout/loadMessages.ts
export async function loadCheckoutMessages(locale: string) {
  const messages = await import(`./messages/${locale}.ts`);
  return messages.default;
}

// features/checkout/CheckoutForm.tsx
("use client");
import { useState, useEffect } from "react";
import { useI18n, useLocale } from "i18n-at";

export function CheckoutForm() {
  const locale = useLocale();
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    import(`./messages/${locale}.ts`).then((m) => setMessages(m.default));
  }, [locale]);

  if (!messages) return <LoadingSpinner />;

  const { t, m } = useI18n(messages);
  return (
    <form>
      <h2>{t(m.title)}</h2>
      {/* Form fields */}
    </form>
  );
}
```

## Suspense Integration

Use React Suspense for cleaner lazy loading:

```typescript
import { lazy, Suspense } from "react";

// Create a lazy-loaded component with its messages
const LazyDashboard = lazy(async () => {
  const [component, messages] = await Promise.all([
    import("./Dashboard"),
    import("./messages"),
  ]);

  // Return component with messages injected
  return {
    default: () => <component.default messages={messages.messages} />,
  };
});

// Usage
export function App() {
  return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <LazyDashboard />
    </Suspense>
  );
}
```

## Progressive Enhancement

Load core messages immediately, enhance with additional messages:

```typescript
// Core messages (small, critical)
const { messages: coreMessages } = defineMessages({
  en: {
    loading: "Loading...",
    error: "Error occurred",
  },
});

// Extended messages (larger, less critical)
async function loadExtendedMessages(locale: string) {
  const module = await import(`./extended/${locale}`);
  return module.messages;
}

// Component with progressive loading
function EnhancedComponent() {
  const [extendedMessages, setExtendedMessages] = useState(null);
  const locale = useLocale();

  useEffect(() => {
    loadExtendedMessages(locale).then(setExtendedMessages);
  }, [locale]);

  // Use core messages immediately
  const { t: tCore, m: mCore } = useI18n(coreMessages);

  // Use extended messages when available
  const extended = extendedMessages ? useI18n(extendedMessages) : null;

  return (
    <div>
      <h1>{extended ? extended.t(extended.m.title) : tCore(mCore.loading)}</h1>
    </div>
  );
}
```

## Bundle Analysis

Monitor your bundle size impact:

```typescript
// webpack.config.js or next.config.js
module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Split translation chunks
      config.optimization.splitChunks.cacheGroups.translations = {
        test: /messages[\\/]/,
        name: "translations",
        chunks: "async",
      };
    }
    return config;
  },
};
```

## Best Practices

### 1. Strategic Splitting

Split messages based on:

- **Route boundaries** - Each route loads its own messages
- **Feature boundaries** - Large features load independently
- **User journey** - Load messages as users progress

### 2. Preloading

Preload messages for likely next steps:

```typescript
// Preload checkout messages when user adds to cart
function AddToCartButton() {
  const handleClick = () => {
    // Add to cart logic

    // Preload checkout messages
    import("@/features/checkout/messages");
  };

  return <button onClick={handleClick}>Add to Cart</button>;
}
```

### 3. Caching Strategy

Implement caching for loaded messages:

```typescript
const messageCache = new Map();

export async function getCachedMessages(locale: string, feature: string) {
  const cacheKey = `${locale}-${feature}`;

  if (messageCache.has(cacheKey)) {
    return messageCache.get(cacheKey);
  }

  const messages = await import(`./messages/${locale}/${feature}`);
  messageCache.set(cacheKey, messages.default);

  return messages.default;
}
```

## Performance Tips

1. **Keep core messages small** - Include only essential UI text
2. **Use code splitting** - Let bundlers optimize chunk sizes
3. **Monitor bundle size** - Track the impact of translations
4. **Consider SSG/SSR** - Server-render translated content when possible

## Next Steps

- Learn about [Performance Optimization](/advanced/optimization)
- Explore [Component Patterns](/advanced/component-patterns)

