# Performance Optimization

Learn how to optimize your i18n-at implementation for maximum performance.

## Message Splitting Strategies

### By Route

Split messages by route to reduce initial bundle size:

```typescript
// app/[locale]/home/messages.ts
export const { messages: homeMessages } = defineMessages({
  en: { title: "Home", welcome: "Welcome" },
  ja: { title: "ホーム", welcome: "ようこそ" },
});

// app/[locale]/about/messages.ts
export const { messages: aboutMessages } = defineMessages({
  en: { title: "About Us", content: "..." },
  ja: { title: "私たちについて", content: "..." },
});
```

### By Feature

Organize large features into separate message modules:

```typescript
// features/auth/messages.ts
export const { messages: authMessages } = defineMessages({
  en: {
    login: {
      /* login messages */
    },
    register: {
      /* register messages */
    },
    reset: {
      /* password reset messages */
    },
  },
});

// features/dashboard/messages.ts
export const { messages: dashboardMessages } = defineMessages({
  en: {
    widgets: {
      /* widget messages */
    },
    stats: {
      /* statistics messages */
    },
  },
});
```

## Server-Side Optimization

### Static Generation

Pre-render translated pages at build time:

```typescript
// app/[locale]/static-page/page.tsx
import { getI18n } from "i18n-at";
import { messages } from "./messages";

// Generate static pages for each locale
export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ja" }, { locale: "zh" }];
}

export default function StaticPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t, m } = getI18n(messages, locale);

  // This page will be statically generated with translations
  return <article>{t(m.content)}</article>;
}
```

### Selective Hydration

Only hydrate interactive parts:

```typescript
// Server Component (no hydration needed)
import { getI18n } from "i18n-at";
import InteractiveSection from "./InteractiveSection";

export default function Page({ params: { locale } }) {
  const { t, m } = getI18n(messages, locale);

  return (
    <div>
      {/* Static content - no JS needed */}
      <h1>{t(m.title)}</h1>
      <p>{t(m.description)}</p>

      {/* Only this part needs hydration */}
      <InteractiveSection />
    </div>
  );
}
```

## Client-Side Optimization

### Memoization

Memoize expensive translation operations:

```typescript
"use client";
import { useMemo } from "react";
import { useI18n } from "i18n-at";

function DataTable({ data }: { data: Item[] }) {
  const { t, m } = useI18n(messages);

  // Memoize translated headers
  const headers = useMemo(
    () => [
      { key: "name", label: t(m.table.headers.name) },
      { key: "status", label: t(m.table.headers.status) },
      { key: "date", label: t(m.table.headers.date) },
    ],
    [t, m]
  );

  // Memoize row translations
  const rows = useMemo(
    () =>
      data.map((item) => ({
        ...item,
        statusLabel: t(m.statuses[item.status]),
        dateLabel: formatDate(item.date, locale),
      })),
    [data, t, m, locale]
  );

  return <Table headers={headers} rows={rows} />;
}
```

### Batch Updates

Batch translation updates to avoid unnecessary re-renders:

```typescript
"use client";
import { unstable_batchedUpdates } from "react-dom";

function MultiStepForm() {
  const { t, m } = useI18n(messages);
  const [errors, setErrors] = useState({});

  const validateForm = (data: FormData) => {
    const newErrors = {};

    // Batch all error updates
    unstable_batchedUpdates(() => {
      if (!data.email) {
        newErrors.email = t(m.errors.emailRequired);
      }
      if (!data.password) {
        newErrors.password = t(m.errors.passwordRequired);
      }
      setErrors(newErrors);
    });
  };
}
```

## Bundle Size Optimization

### Tree Shaking

Ensure unused messages are removed:

```typescript
// Only import what you need
import { defineMessages } from "i18n-at";
import { getI18n } from "i18n-at/server";
import { useI18n } from "i18n-at/client";

// This allows better tree shaking
```

### Dynamic Message Loading

Load messages based on user preferences:

```typescript
// utils/loadMessages.ts
const messageLoaders = {
  en: () => import("./messages/en"),
  ja: () => import("./messages/ja"),
  zh: () => import("./messages/zh"),
};

export async function loadMessagesForLocale(locale: string) {
  const loader = messageLoaders[locale] || messageLoaders.en;
  const module = await loader();
  return module.messages;
}
```

## Caching Strategies

### Message Caching

Cache loaded messages in memory:

```typescript
// utils/messageCache.ts
class MessageCache {
  private cache = new Map<string, any>();

  async get(key: string, loader: () => Promise<any>) {
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }

    const messages = await loader();
    this.cache.set(key, messages);
    return messages;
  }

  clear() {
    this.cache.clear();
  }
}

export const messageCache = new MessageCache();

// Usage
const messages = await messageCache.get(
  `dashboard-${locale}`,
  () => import(`./messages/${locale}`)
);
```

### Translation Result Caching

Cache computed translations:

```typescript
"use client";
import { useMemo } from "react";
import LRU from "lru-cache";

const translationCache = new LRU<string, string>({ max: 500 });

function useCachedTranslation(messages: any) {
  const { t: originalT, m } = useI18n(messages);

  const t = useMemo(() => {
    return (key: any, params?: any) => {
      const cacheKey = JSON.stringify({ key, params });

      if (translationCache.has(cacheKey)) {
        return translationCache.get(cacheKey)!;
      }

      const result = originalT(key, params);
      translationCache.set(cacheKey, result);
      return result;
    };
  }, [originalT]);

  return { t, m };
}
```

## Monitoring and Metrics

### Performance Tracking

Track translation performance:

```typescript
// utils/performanceTracking.ts
export function trackTranslationPerformance() {
  if (typeof window === "undefined") return;

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.name.includes("translation")) {
        console.log(`Translation took ${entry.duration}ms`);
        // Send to analytics
      }
    }
  });

  observer.observe({ entryTypes: ["measure"] });
}

// Usage in component
function measureTranslation<T>(name: string, fn: () => T): T {
  performance.mark(`${name}-start`);
  const result = fn();
  performance.mark(`${name}-end`);
  performance.measure(name, `${name}-start`, `${name}-end`);
  return result;
}
```

## Best Practices

1. **Minimize message size** - Keep messages concise and split large sets
2. **Use Server Components** - Render static translations on the server
3. **Lazy load when appropriate** - Load messages as needed
4. **Cache aggressively** - Cache both messages and translations
5. **Monitor bundle impact** - Track how translations affect bundle size
