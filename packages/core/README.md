# i18n-at

🌍 **Type-safe internationalization tool for Next.js App Router with co-location and IDE code jumping**

## ✨ Features

- 🏗️ **Co-location First** - Define messages right where they're used
- 🛡️ **100% Type-safe** - Full TypeScript support with strict typing
- 🔍 **IDE Code Jumping** - Jump directly to message definitions

## 🚀 Quick Start

### Installation

```bash
npm install i18n-at
```

### Basic Usage

```typescript
// Define messages right where you use them
import { defineMessages, useI18n } from "i18n-at";

const { messages } = defineMessages({
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

function Dashboard() {
  const { t, m } = useI18n(messages); // Type-safe & IDE jumping!

  return (
    <div>
      <h1>{t(m.dashboard.title)}</h1>
      <p>{t(m.dashboard.welcome, { name: "User" })}</p>
    </div>
  );
}
```

## 📖 Documentation

For complete documentation, examples, and guides, visit our documentation site:

**[📚 View Full Documentation →](../../docs/)**

- [🚀 Quick Start Guide](../../docs/quick-start.md) - Get started in minutes
- [📚 API Reference](../../docs/api-reference.md) - Complete API documentation
- [🎯 Why i18n-at?](../../docs/why-this-library.md) - Understanding the benefits
- [🏗️ Why Co-location Scales](../../docs/introduction/why-co-location-scales.md) - Tradeoffs and why this model works in larger codebases
- [🔧 Advanced Usage](../../docs/advanced-usage.md) - Advanced patterns and techniques

## 🎯 Why This Library?

Unlike traditional i18n solutions that force you to manage translations in separate files, i18n-at lets you **define and use messages in the same place**:

### ✅ Our Co-location Benefits

- 🎯 **Easy Maintenance**: Messages live next to their usage
- 🔍 **IDE Code Jumping**: F12 jumps directly to message definitions
- 🛡️ **100% Type-safe**: Full TypeScript support
- 🧹 **Dead Code Detection**: Unused messages are easily spotted
- ⚡ **Faster Refactoring**: Change component? Messages move with it

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md).

## 📄 License

MIT © Jabelic

---

**Made with ❤️ for type-safe internationalization**
