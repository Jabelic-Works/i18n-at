# メッセージフォーマット構文

i18n-at は変数補間を含むメッセージを定義するためのシンプルかつ強力な構文を使用します。

## 基本メッセージ

変数のないシンプルなテキストメッセージ：

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

## 変数補間

`{$variableName}`を使用して動的な値を含めます：

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

// 使用例
const { t, m } = useI18n(messages);

t(m.welcome, { name: "Alice" }); // "Welcome, Alice!"
t(m.itemCount, { count: 5 }); // "You have 5 items in your cart"
```

## 複数の変数

1 つのメッセージで複数の変数を使用できます：

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

// 使用例
t(m.orderSummary, {
  orderId: "12345",
  customerName: "John Doe",
  total: "99.99",
});
// "Order #12345 for John Doe - Total: $99.99"
```

## ブレースのエスケープ

メッセージにリテラルブレースを含める必要がある場合は、ダブルブレースを使用します：

```typescript
const { messages } = defineMessages({
  en: {
    code: "Use {{$variable}} for interpolation",
  },
});

// 出力: "Use {$variable} for interpolation"
```

## 型安全性

TypeScript は必要なすべての変数の提供を保証します：

```typescript
const { messages } = defineMessages({
  en: {
    greeting: "Hello, {$name}! You have {$count} messages.",
  },
});

const { t, m } = useI18n(messages);

// ❌ TypeScriptエラー - 必要なパラメータが不足
t(m.greeting);

// ❌ TypeScriptエラー - 'count'パラメータが不足
t(m.greeting, { name: "Alice" });

// ✅ すべてのパラメータが提供されている
t(m.greeting, { name: "Alice", count: 5 });
```

## ベストプラクティス

1. **説明的な変数名を使用**: `{$u}`ではなく`{$userName}`
2. **メッセージを簡潔に保つ**: 長いメッセージは複数のキーに分割
3. **メッセージに HTML を含めない**: 代わりにコンポーネント構成を使用
4. **命名を一貫させる**: ロケール間で同じ変数名を使用
