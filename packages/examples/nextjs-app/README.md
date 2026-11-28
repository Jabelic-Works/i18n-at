# i18n-at Example App

This is a Next.js App Router example demonstrating `i18n-at`. It shows the same
dashboard and interactions as the [Vite + React example](../vite-react/README.md).
The navigation badge identifies the Next.js App Router runtime.

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
│   └── layout.tsx        # Root HTML layout
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
  "en-US": {
    dashboard: {
      title: "Dashboard",
      welcome: "Welcome, {name}!",
    },
  },
  "ja-JP": {
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
const { t, m } = getI18n(messages, locale);
return <h1>{t(m.dashboard.title)}</h1>;
```

### 3. Client Component Usage

```typescript
// components/Dashboard.tsx
"use client";
const { t, m } = useI18n(messages);
const locale = useLocale();
return <h2>{t(m.dashboard.title)} ({locale})</h2>;
```

## Development

```bash
# Install dependencies
pnpm install

# Start the Next.js example
pnpm --dir packages/examples/nextjs-app dev

# Build core and the Next.js example
pnpm --dir packages/core build
pnpm --dir packages/examples/nextjs-app build
```

## Testing Languages

Visit these URLs to test different locales:

- English: http://localhost:3000/en-US
- Japanese: http://localhost:3000/ja-JP
- Chinese: http://localhost:3000/zh-CN

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
