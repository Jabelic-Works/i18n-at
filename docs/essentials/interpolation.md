# Variable Interpolation

How to incorporate dynamic values into translations in real-world applications.

## Interpolation Examples

### User Information Display

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

// Implementation example
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

#### Type Safety Benefits

i18n-at leverages TypeScript's type system to ensure interpolation parameter safety:

```typescript
const { messages } = defineMessages({
  en: {
    orderTotal: "Total: {$amount} ({$itemCount} items)",
  },
});

// ✅ Correct usage
t(m.orderTotal, { amount: "$99.99", itemCount: "3" });

// ❌ TypeScript error - missing required parameter
t(m.orderTotal, { amount: "$99.99" });

// ❌ TypeScript error - wrong parameter name
t(m.orderTotal, { total: "$99.99", count: "3" });
```
