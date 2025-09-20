# 🎯 Why i18n-at?

Understanding the problems with traditional i18n solutions and how i18n-at solves them.

## The Problem with Traditional i18n

Most internationalization libraries force you to manage translations in separate files, leading to several issues:

### ❌ **Disconnected Translations**

```typescript
// Traditional approach - separate files
// locales/en.json
{
  "dashboard.title": "Dashboard",
  "dashboard.welcome": "Welcome, {name}!"
}

// locales/ja.json
{
  "dashboard.title": "ダッシュボード",
  "dashboard.welcome": "{name} さん、ようこそ！"
}

// Your component - no connection to translations
import { useTranslation } from 'react-i18next';

function Dashboard() {
  const { t } = useTranslation();

  // ❌ String literals - error-prone and no type safety
  return (
    <div>
      <h1>{t("dashboard.title")}</h1>
      <p>{t("dashboard.welcome", { name: "User" })}</p>
    </div>
  );
}
```

### 🚫 **Major Problems:**

- **No Type Safety**: Typos in translation keys only discovered at runtime
- **No IDE Support**: Can't jump to translation definitions
- **Hard Maintenance**: Translations scattered across multiple files
- **Dead Code**: Unused translations are hard to detect
- **Refactoring Issues**: Moving components doesn't move their translations

## 🏗️ **Co-location First**: Our Solution

i18n-at lets you **define and use messages in the same place**:

```typescript
// ✅ Messages defined right where they're used
export const { messages } = defineMessages({
  en: {
    dashboard: {
      title: "Dashboard",
      welcome: "Welcome, {$name}!",
    },
  },
  ja: {
    dashboard: {
      title: "ダッシュボード",
      welcome: "{$name} さん、ようこそ！",
    },
  },
});

// Used immediately in the same component
function Dashboard() {
  const { t, m } = useI18n(messages);

  // ✅ Full type safety and IDE jumping
  return (
    <div>
      <h1>{t(m.dashboard.title)}</h1>
      <p>{t(m.dashboard.welcome, { name: "User" })}</p>
    </div>
  );
}
```

## ✅ Benefits of Our Approach

### 🔍 **IDE Code Jumping**

Press F12 on any message reference to jump directly to its definition. No more hunting through locale files!

```typescript
const { t, m } = useI18n(messages);

// F12 on m.dashboard.title jumps to the message definition
return <h1>{t(m.dashboard.title)}</h1>;
```

### 🛡️ **100% Type Safety**

Catch translation errors at compile time, not runtime:

```typescript
const { t, m } = useI18n(messages);

// ✅ Valid - TypeScript knows this message exists
t(m.dashboard.title);

// ❌ TypeScript error - catches typos immediately
t(m.dashboard.titl); // Property 'titl' does not exist

// ❌ TypeScript error - missing required parameter
t(m.dashboard.welcome); // Missing 'name' parameter

// ✅ Valid - all parameters provided
t(m.dashboard.welcome, { name: "Alice" });
```

### 🎯 **Easy Maintenance**

Messages live next to their usage, making maintenance a breeze:

- **Component changes?** Translations move with them
- **Delete a component?** Its translations are automatically cleaned up
- **Refactor message structure?** TypeScript guides you through all usage sites

### 🧹 **Dead Code Detection**

Unused messages are easily spotted since they're co-located:

```typescript
export const { messages } = defineMessages({
  en: {
    dashboard: {
      title: "Dashboard",
      subtitle: "Your overview", // ← Unused? Easy to spot!
      welcome: "Welcome, {$name}!",
    },
  },
});

// Only title and welcome are used - subtitle is clearly unused
function Dashboard() {
  const { t, m } = useI18n(messages);
  return (
    <div>
      <h1>{t(m.dashboard.title)}</h1>
      <p>{t(m.dashboard.welcome, { name: "User" })}</p>
    </div>
  );
}
```

### ⚡ **Superior Developer Experience**

- **1-line declaration**: `const { t, m } = useI18n(messages)`
- **Full autocomplete**: IntelliSense for all message paths
- **Instant feedback**: TypeScript errors for invalid usage
- **Zero configuration**: No complex setup or build tools

## 🔄 **Migration Made Easy**

Worried about migrating from your current i18n solution? i18n-at can coexist:

```typescript
// Gradually migrate component by component
function NewComponent() {
  // ✅ New way - co-located messages
  const { messages } = defineMessages({
    en: { title: "New Feature" },
    ja: { title: "新機能" },
  });
  const { t, m } = useI18n(messages);

  return <h1>{t(m.title)}</h1>;
}

function LegacyComponent() {
  // ✅ Old way still works during migration
  const { t } = useTranslation();
  return <h1>{t("legacy.title")}</h1>;
}
```

## 📊 **Comparison Table**

| Feature             | Traditional i18n  | i18n-at           |
| ------------------- | ----------------- | ----------------- |
| Type Safety         | ❌ Runtime only   | ✅ Compile time   |
| IDE Jumping         | ❌ No support     | ✅ F12 navigation |
| Co-location         | ❌ Separate files | ✅ Same component |
| Dead Code Detection | ❌ Hard to find   | ✅ Easy to spot   |
| Refactoring         | ❌ Manual sync    | ✅ Automatic      |
| Setup Complexity    | ❌ Complex config | ✅ Zero config    |
| Learning Curve      | ❌ Steep          | ✅ Gentle         |

## 🚀 **Ready to Try?**

Experience the difference that co-location and type safety make:

[Get Started →](/quick-start)

