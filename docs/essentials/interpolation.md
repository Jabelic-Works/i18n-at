# Variable Interpolation

Learn how to use dynamic values in your translations with i18n-at's interpolation system.

## Basic Interpolation

The most common use case is inserting dynamic values into messages:

```typescript
const { messages } = defineMessages({
  en: {
    greeting: "Hello, {$name}!",
    status: "Your order {$orderId} is {$status}",
  },
});

// Usage
const { t, m } = useI18n(messages);

t(m.greeting, { name: "Alice" });
// "Hello, Alice!"

t(m.status, { orderId: "#12345", status: "shipped" });
// "Your order #12345 is shipped"
```

## Type-Safe Parameters

TypeScript ensures you provide all required parameters:

```typescript
// TypeScript knows these parameters are required
t(m.greeting, { name: "Alice" }); // ✅ Valid

// TypeScript error - missing required parameter
t(m.greeting); // ❌ Error: Missing 'name' parameter

// TypeScript error - wrong parameter name
t(m.greeting, { username: "Alice" }); // ❌ Error: Expected 'name', not 'username'
```

## Optional Parameters

All interpolation parameters are required by default. If you need optional behavior, handle it in your message structure:

```typescript
const { messages } = defineMessages({
  en: {
    userInfo: "{$name} {$email}",
    userInfoWithOptional: "{$name}",
  },
});

// For optional email, use a separate message key
const email = user.email;
const messageKey = email ? m.userInfo : m.userInfoWithOptional;
const params = email ? { name: user.name, email } : { name: user.name };

t(messageKey, params);
```

## Number and Date Formatting

For numbers and dates, format them before passing to the translation function:

```typescript
const { messages } = defineMessages({
  en: {
    price: "Total: {$amount}",
    date: "Due on {$date}",
  },
});

// Format before interpolating
const formattedAmount = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
}).format(99.99);

const formattedDate = new Intl.DateTimeFormat("en-US").format(new Date());

t(m.price, { amount: formattedAmount }); // "Total: $99.99"
t(m.date, { date: formattedDate }); // "Due on 12/25/2023"
```

## Arrays and Lists

For lists, format them into strings before interpolation:

```typescript
const { messages } = defineMessages({
  en: {
    attendees: "Attendees: {$names}",
  },
});

const names = ["Alice", "Bob", "Charlie"];
const formattedNames = names.join(", ");

t(m.attendees, { names: formattedNames });
// "Attendees: Alice, Bob, Charlie"
```

## Best Practices

### 1. Keep Variable Names Consistent

Use the same variable names across all locales:

```typescript
// ✅ Good - consistent variable names
const { messages } = defineMessages({
  en: { welcome: "Welcome, {$userName}!" },
  ja: { welcome: "{$userName}さん、ようこそ！" },
});

// ❌ Bad - different variable names
const { messages } = defineMessages({
  en: { welcome: "Welcome, {$userName}!" },
  ja: { welcome: "{$name}さん、ようこそ！" }, // Different variable name
});
```

### 2. Use Descriptive Names

```typescript
// ✅ Good - clear what the variable represents
t(m.shipping, { customerName: "John", orderDate: "2023-12-25" });

// ❌ Bad - unclear variable names
t(m.shipping, { n: "John", d: "2023-12-25" });
```

### 3. Avoid Complex Logic in Messages

Keep interpolation simple. Handle complex logic in your code:

```typescript
// ✅ Good - logic in code
const status = order.shipped ? "shipped" : "processing";
t(m.orderStatus, { status });

// ❌ Bad - trying to put logic in the message
// (This isn't supported in i18n-at)
```

## Next Steps

- Explore [Message Format Syntax](/essentials/message-format-syntax)
- Learn about [TypeScript Support](/advanced/typescript-support)

