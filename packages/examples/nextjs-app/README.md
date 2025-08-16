# i18n-at Example App

This is a Next.js App Router example demonstrating the usage of `i18n-at` library for type-safe internationalization with co-location.

## Features Demonstrated

- 🏗️ **Co-location**: Messages defined where they're used (`src/messages.ts`)
- 🛡️ **Type Safety**: Full TypeScript support with IDE jumping
- 🚀 **Next.js App Router**: Server and client components
- 🌐 **Multi-language**: English, Japanese, Chinese support
- 📱 **Responsive Design**: Tailwind CSS styling

## Project Structure

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx    # I18nClientProvider setup
│   │   └── page.tsx      # Server component with i18n
│   ├── globals.css
│   └── layout.tsx        # Root layout with locale redirect
├── components/
│   ├── Dashboard.tsx     # Client component example
│   └── Navigation.tsx    # Server component navigation
└── messages.ts           # Co-located message definitions
```

## Key Implementation

### 1. Message Definition (Co-location)

```typescript
// src/messages.ts
export const { messages } = defineMessages({
  en: {
    dashboard: {
      title: "Dashboard",
      welcome: "Welcome, {name}!",
    },
  },
  ja: {
    dashboard: {
      title: "ダッシュボード",
      welcome: "{name} さん、ようこそ！",
    },
  },
});
```

### 2. Server Component Usage

```typescript
// app/[locale]/page.tsx
const t = getI18n(messages, locale);
const m = at(locale, messages); // ← Type-safe & IDE jumping!
return <h1>{t(m.dashboard.title)}</h1>;
```

### 3. Client Component Usage

```typescript
// components/Dashboard.tsx
"use client";
const { t } = useI18n(messages);
const locale = useLocale();
const m = at(locale, messages); // ← IDE jumping works!
```

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

## Testing Languages

Visit these URLs to test different locales:

- English: http://localhost:3000/en
- Japanese: http://localhost:3000/ja
- Chinese: http://localhost:3000/zh

## Key Benefits Shown

1. **Co-location**: Messages live next to their usage
2. **IDE Support**: F12 jumps to message definitions
3. **Type Safety**: Full autocomplete and compile-time checks
4. **Easy Refactoring**: Move component = messages move with it
5. **Dead Code Detection**: Unused messages easily spotted

## Next.js Features Used

- App Router with dynamic `[locale]` routes
- Server and Client Components
- TypeScript support
- Tailwind CSS styling
- Workspace dependencies with pnpm
