# 変数の補間

i18n-at の補間システムを使用して翻訳に動的な値を使用する方法を学びます。

## 基本的な補間

最も一般的な使用例は、メッセージに動的な値を挿入することです：

```typescript
const { messages } = defineMessages({
  en: {
    greeting: "Hello, {$name}!",
    status: "Your order {$orderId} is {$status}",
  },
});

// 使用例
const { t, m } = useI18n(messages);

t(m.greeting, { name: "Alice" });
// "Hello, Alice!"

t(m.status, { orderId: "#12345", status: "shipped" });
// "Your order #12345 is shipped"
```

## 型安全なパラメータ

TypeScript は必要なすべてのパラメータの提供を保証します：

```typescript
// TypeScriptはこれらのパラメータが必要であることを認識
t(m.greeting, { name: "Alice" }); // ✅ 有効

// TypeScriptエラー - 必要なパラメータが不足
t(m.greeting); // ❌ エラー: 'name'パラメータが不足

// TypeScriptエラー - 間違ったパラメータ名
t(m.greeting, { username: "Alice" }); // ❌ エラー: 'name'が期待されているが'username'
```

## オプションパラメータ

デフォルトですべての補間パラメータは必須です。オプションの動作が必要な場合は、メッセージ構造で処理します：

```typescript
const { messages } = defineMessages({
  en: {
    userInfo: "{$name} {$email}",
    userInfoWithOptional: "{$name}",
  },
});

// オプションのemailには別のメッセージキーを使用
const email = user.email;
const messageKey = email ? m.userInfo : m.userInfoWithOptional;
const params = email ? { name: user.name, email } : { name: user.name };

t(messageKey, params);
```

## 数値と日付のフォーマット

数値と日付については、翻訳関数に渡す前にフォーマットします：

```typescript
const { messages } = defineMessages({
  en: {
    price: "Total: {$amount}",
    date: "Due on {$date}",
  },
});

// 補間前にフォーマット
const formattedAmount = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
}).format(99.99);

const formattedDate = new Intl.DateTimeFormat("en-US").format(new Date());

t(m.price, { amount: formattedAmount }); // "Total: $99.99"
t(m.date, { date: formattedDate }); // "Due on 12/25/2023"
```

## 配列とリスト

リストについては、補間前に文字列にフォーマットします：

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

## ベストプラクティス

### 1. 変数名を一貫させる

すべてのロケールで同じ変数名を使用：

```typescript
// ✅ 良い例 - 一貫した変数名
const { messages } = defineMessages({
  en: { welcome: "Welcome, {$userName}!" },
  ja: { welcome: "{$userName}さん、ようこそ！" },
});

// ❌ 悪い例 - 異なる変数名
const { messages } = defineMessages({
  en: { welcome: "Welcome, {$userName}!" },
  ja: { welcome: "{$name}さん、ようこそ！" }, // 異なる変数名
});
```

### 2. 説明的な名前を使用

```typescript
// ✅ 良い例 - 変数が何を表すかが明確
t(m.shipping, { customerName: "John", orderDate: "2023-12-25" });

// ❌ 悪い例 - 不明確な変数名
t(m.shipping, { n: "John", d: "2023-12-25" });
```

### 3. メッセージでの複雑なロジックを避ける

補間をシンプルに保つ。複雑なロジックはコードで処理：

```typescript
// ✅ 良い例 - ロジックはコード内
const status = order.shipped ? "shipped" : "processing";
t(m.orderStatus, { status });

// ❌ 悪い例 - メッセージにロジックを入れようとする
// （これはi18n-atではサポートされていません）
```

## 次のステップ

- [メッセージフォーマット構文](/ja-jp/essentials/message-format-syntax)を探る
- [TypeScript サポート](/ja-jp/advanced/typescript-support)を学ぶ
