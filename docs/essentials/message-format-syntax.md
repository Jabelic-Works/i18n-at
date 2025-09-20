# Message Format Syntax

i18n-at uses a simple yet powerful syntax for defining messages with variable interpolation.

## Basic Messages

Simple text messages without any variables:

```typescript
const { messages } = defineMessages({
  en: {
    greeting: "Hello, world!",
    farewell: "Goodbye!",
  },
  ja: {
    greeting: "こんにちは、世界！",
    farewell: "さようなら！",
  },
});
```

## Variable Interpolation

Use `{$variableName}` to include dynamic values:

```typescript
const { messages } = defineMessages({
  en: {
    welcome: "Welcome, {$name}!",
    itemCount: "You have {$count} items in your cart",
  },
  ja: {
    welcome: "{$name}さん、ようこそ！",
    itemCount: "カートに{$count}個のアイテムがあります",
  },
});

// Usage
const { t, m } = useI18n(messages);

t(m.welcome, { name: "Alice" }); // "Welcome, Alice!"
t(m.itemCount, { count: 5 }); // "You have 5 items in your cart"
```

## Multiple Variables

You can use multiple variables in a single message:

```typescript
const { messages } = defineMessages({
  en: {
    orderSummary: "Order #{$orderId} for {$customerName} - Total: ${$total}",
  },
  ja: {
    orderSummary:
      "注文番号: {$orderId} / お客様: {$customerName} / 合計: {$total}円",
  },
});

// Usage
t(m.orderSummary, {
  orderId: "12345",
  customerName: "John Doe",
  total: "99.99",
});
// "Order #12345 for John Doe - Total: $99.99"
```

## Escaping Braces

If you need to include literal braces in your messages, double them:

```typescript
const { messages } = defineMessages({
  en: {
    code: "Use {{$variable}} for interpolation",
  },
});

// Output: "Use {$variable} for interpolation"
```

## Type Safety

TypeScript ensures you provide all required variables:

```typescript
const { messages } = defineMessages({
  en: {
    greeting: "Hello, {$name}! You have {$count} messages.",
  },
});

const { t, m } = useI18n(messages);

// ❌ TypeScript error - missing required parameters
t(m.greeting);

// ❌ TypeScript error - missing 'count' parameter
t(m.greeting, { name: "Alice" });

// ✅ All parameters provided
t(m.greeting, { name: "Alice", count: 5 });
```

## Best Practices

1. **Use descriptive variable names**: `{$userName}` instead of `{$u}`
2. **Keep messages concise**: Break long messages into multiple keys
3. **Avoid HTML in messages**: Use component composition instead
4. **Be consistent with naming**: Use the same variable names across locales

## Next Steps

- Learn about [Pluralization](/essentials/pluralization)
- Explore [Advanced Interpolation](/advanced/component-interpolation)

