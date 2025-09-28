# 変数の補間

実際のアプリケーションで動的な値を翻訳に組み込む方法について。

## 補間例

### ユーザー情報の表示

```typescript
const { messages } = defineMessages({
  en: {
    userProfile: "Profile: {$name} ({$email})",
    lastLogin: "Last seen {$timeAgo}",
  },
  ja: {
    userProfile: "プロフィール: {$name} ({$email})",
    lastLogin: "最終ログイン: {$timeAgo}",
  },
});

// 実装例
function UserProfile({ user }: { user: User }) {
  const { t, m } = useI18n(messages);

  return (
    <div>
      <h2>{t(m.userProfile, { name: user.name, email: user.email })}</h2>
      <p>{t(m.lastLogin, { timeAgo: formatTimeAgo(user.lastLoginAt) })}</p>
    </div>
  );
}
```

#### 型の活用

i18n-at は TypeScript の型システムを活用して、補間パラメータの型安全性を保証します：

```typescript
const { messages } = defineMessages({
  en: {
    orderTotal: "Total: {$amount} ({$itemCount} items)",
  },
});

// ✅ 正しい使用法
t(m.orderTotal, { amount: "$99.99", itemCount: "3" });

// ❌ TypeScriptエラー - 必要なパラメータが不足
t(m.orderTotal, { amount: "$99.99" });

// ❌ TypeScriptエラー - 間違ったパラメータ名
t(m.orderTotal, { total: "$99.99", count: "3" });
```
