# What is i18n-at?

i18n-at is a type-safe internationalization tool designed specifically for Next.js App Router applications. It brings a fresh approach to managing translations with its co-location first philosophy.

## 🏗️ Co-location First

Unlike traditional i18n libraries that force you to manage translations in separate files, i18n-at lets you **define and use messages in the same place**. This means:

- 📍 **Messages live next to their usage** - Keep translations close to your components
- 🔍 **IDE code jumping** - Press F12 to jump directly to message definitions
- 🧹 **Easy maintenance** - Refactor components and translations move with them

## 🛡️ 100% Type-safe

With full TypeScript support, you'll catch translation errors at compile time:

- ✅ **Autocomplete for all message paths**
- ✅ **Type checking for interpolation parameters**
- ✅ **No more runtime translation key errors**

## ⚡ Developer Experience

Designed with developer productivity in mind:

- **1-line declaration** - `const { t, m } = useI18n(messages)`
- **Zero configuration** - Works out of the box with Next.js
- **Instant feedback** - TypeScript errors guide you

## 🎯 Perfect for Next.js

Built specifically for Next.js App Router:

- **Server Components support** - Use translations in RSC
- **Client Components support** - Hooks for client-side usage
- **App Router optimized** - Follows Next.js best practices

