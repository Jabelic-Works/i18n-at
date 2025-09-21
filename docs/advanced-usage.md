# 🔧 Advanced Usage

Explore advanced patterns and techniques for getting the most out of i18n-at.

## Dynamic Locale Loading

Handle dynamic locale selection and loading:

```typescript
// Conditional locale loading
const getMessages = (locale: string) => {
  switch (locale) {
    case "en-US":
      return at("en-US", messages);
    case "ja-JP":
      return at("ja-JP", messages);
    case "zh-CN":
      return at("zh-CN", messages);
    default:
      return at("en-US", messages); // Fallback to English
  }
};

// Usage in components
function LocalizedComponent({ locale }: { locale: string }) {
  const localizedMessages = getMessages(locale);
  const { t, m } = useI18n(localizedMessages);

  return <h1>{t(m.title)}</h1>;
}
```

## Nested Message Structures

Organize complex message hierarchies:

```typescript
const { messages } = defineMessages({
  en: {
    auth: {
      login: {
        title: "Sign In",
        form: {
          email: "Email Address",
          password: "Password",
          confirmPassword: "Confirm Password",
        },
        buttons: {
          submit: "Sign In",
          forgotPassword: "Forgot Password?",
          createAccount: "Create New Account",
        },
        errors: {
          invalidEmail: "Please enter a valid email",
          passwordRequired: "Password is required",
          loginFailed: "Invalid credentials",
        },
      },
      register: {
        title: "Create Account",
        form: {
          firstName: "First Name",
          lastName: "Last Name",
          email: "Email Address",
          password: "Password",
        },
      },
    },
    dashboard: {
      navigation: {
        home: "Home",
        profile: "Profile",
        settings: "Settings",
        logout: "Logout",
      },
      widgets: {
        weather: {
          title: "Weather",
          loading: "Loading weather data...",
          error: "Failed to load weather",
        },
        notifications: {
          title: "Notifications",
          empty: "No new notifications",
          markAllRead: "Mark all as read",
        },
      },
    },
  },
  ja: {
    auth: {
      login: {
        title: "ログイン",
        form: {
          email: "メールアドレス",
          password: "パスワード",
          confirmPassword: "パスワード確認",
        },
        buttons: {
          submit: "ログイン",
          forgotPassword: "パスワードを忘れた方はこちら",
          createAccount: "新しいアカウントを作成",
        },
        errors: {
          invalidEmail: "有効なメールアドレスを入力してください",
          passwordRequired: "パスワードは必須です",
          loginFailed: "認証情報が正しくありません",
        },
      },
      register: {
        title: "アカウント作成",
        form: {
          firstName: "名",
          lastName: "姓",
          email: "メールアドレス",
          password: "パスワード",
        },
      },
    },
    dashboard: {
      navigation: {
        home: "ホーム",
        profile: "プロフィール",
        settings: "設定",
        logout: "ログアウト",
      },
      widgets: {
        weather: {
          title: "天気",
          loading: "天気データを読み込み中...",
          error: "天気データの読み込みに失敗しました",
        },
        notifications: {
          title: "通知",
          empty: "新しい通知はありません",
          markAllRead: "すべて既読にする",
        },
      },
    },
  },
});

// Usage with full autocomplete support
function LoginForm() {
  const { t, m } = useI18n(messages);

  return (
    <form>
      <h1>{t(m.auth.login.title)}</h1>
      <input placeholder={t(m.auth.login.form.email)} />
      <input placeholder={t(m.auth.login.form.password)} />
      <button>{t(m.auth.login.buttons.submit)}</button>
    </form>
  );
}
```

## Message Interpolation Patterns

Advanced patterns for variable interpolation:

### Multiple Variables

```typescript
const { messages } = defineMessages({
  en: {
    order: {
      summary:
        "Order #{$orderId} for {$customerName} - {$itemCount} items (${$total})",
      shipping: "Shipping to {$address} on {$date}",
    },
  },
});

// Usage
const { t, m } = useI18n(messages);

t(m.order.summary, {
  orderId: "12345",
  customerName: "John Doe",
  itemCount: 3,
  total: "99.99",
});
// "Order #12345 for John Doe - 3 items ($99.99)"
```

### Conditional Messages

```typescript
const { messages } = defineMessages({
  en: {
    status: {
      user: "User is {$isOnline, select, true {online} false {offline} other {unknown}}",
      order:
        "Order is {$status, select, pending {being processed} shipped {on the way} delivered {completed} other {in unknown state}}",
    },
  },
});

// Usage
t(m.status.user, { isOnline: true }); // "User is online"
t(m.status.order, { status: "shipped" }); // "Order is on the way"
```

## Component-Specific Messages

Create reusable message patterns:

```typescript
// Button component with its own messages
function ActionButton({
  action,
  onClick,
}: {
  action: "save" | "delete" | "cancel";
  onClick: () => void;
}) {
  const { messages } = defineMessages({
    en: {
      save: "Save Changes",
      delete: "Delete Item",
      cancel: "Cancel",
    },
    ja: {
      save: "変更を保存",
      delete: "削除",
      cancel: "キャンセル",
    },
  });

  const { t, m } = useI18n(messages);

  return <button onClick={onClick}>{t(m[action])}</button>;
}

// Modal component with its own messages
function ConfirmModal({ isOpen, onConfirm, onCancel }: ModalProps) {
  const { messages } = defineMessages({
    en: {
      title: "Confirm Action",
      message: "Are you sure you want to proceed?",
      confirm: "Confirm",
      cancel: "Cancel",
    },
    ja: {
      title: "操作の確認",
      message: "本当に実行しますか？",
      confirm: "確認",
      cancel: "キャンセル",
    },
  });

  const { t, m } = useI18n(messages);

  if (!isOpen) return null;

  return (
    <div className="modal">
      <h2>{t(m.title)}</h2>
      <p>{t(m.message)}</p>
      <button onClick={onConfirm}>{t(m.confirm)}</button>
      <button onClick={onCancel}>{t(m.cancel)}</button>
    </div>
  );
}
```

## Message Composition

Compose complex messages from simpler parts:

```typescript
const { messages } = defineMessages({
  en: {
    common: {
      loading: "Loading...",
      error: "An error occurred",
      retry: "Retry",
    },
    user: {
      profile: {
        loading: "Loading user profile...",
        error: "Failed to load user profile",
        title: "User Profile",
      },
    },
  },
});

// Usage with composition
function UserProfile() {
  const { t, m } = useI18n(messages);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  if (loading) return <div>{t(m.user.profile.loading)}</div>;
  if (error)
    return (
      <div>
        {t(m.user.profile.error)}
        <button onClick={() => setLoading(true)}>{t(m.common.retry)}</button>
      </div>
    );

  return <h1>{t(m.user.profile.title)}</h1>;
}
```

## Performance Optimization

### Message Splitting

For large applications, split messages by feature:

```typescript
// auth/messages.ts
export const { messages: authMessages } = defineMessages({
  en: {
    /* auth messages */
  },
  ja: {
    /* auth messages */
  },
});

// dashboard/messages.ts
export const { messages: dashboardMessages } = defineMessages({
  en: {
    /* dashboard messages */
  },
  ja: {
    /* dashboard messages */
  },
});

// Usage
function AuthPage() {
  const { t, m } = useI18n(authMessages); // Only loads auth messages
  return <h1>{t(m.login.title)}</h1>;
}
```

### Lazy Loading

Implement lazy loading for message bundles:

```typescript
const loadMessages = async (feature: string, locale: string) => {
  const module = await import(`./messages/${feature}/${locale}.ts`);
  return module.messages;
};

// Usage with Suspense
function LazyFeature({ locale }: { locale: string }) {
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    loadMessages("dashboard", locale).then(setMessages);
  }, [locale]);

  if (!messages) return <div>Loading...</div>;

  const { t, m } = useI18n(messages);
  return <h1>{t(m.title)}</h1>;
}
```

## Testing

Test your internationalized components effectively:

```typescript
import { render, screen } from "@testing-library/react";
import { I18nClientProvider } from "i18n-at";
import Component from "./Component";

const renderWithI18n = (component: React.ReactElement, locale = "en") => {
  return render(
    <I18nClientProvider locale={locale}>{component}</I18nClientProvider>
  );
};

describe("Component", () => {
  it("renders in English", () => {
    renderWithI18n(<Component />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("renders in Japanese", () => {
    renderWithI18n(<Component />, "ja");
    expect(screen.getByText("ダッシュボード")).toBeInTheDocument();
  });
});
```

## TypeScript Tips

### Strict Message Types

Define strict types for your message keys:

```typescript
type MessageKeys = "title" | "subtitle" | "description";

const { messages } = defineMessages({
  en: {
    title: "Title",
    subtitle: "Subtitle",
    description: "Description",
  } as Record<MessageKeys, string>,
  ja: {
    title: "タイトル",
    subtitle: "サブタイトル",
    description: "説明",
  } as Record<MessageKeys, string>,
});
```

### Message Validation

Create utilities to validate message completeness:

```typescript
type ValidateMessages<T> = {
  [K in keyof T]: T[K] extends string ? T[K] : ValidateMessages<T[K]>;
};

const validateMessages = <T>(
  messages: ValidateMessages<T>
): ValidateMessages<T> => messages;

// Usage - ensures all locales have the same structure
const { messages } = defineMessages({
  en: validateMessages({
    title: "Title",
    nested: { key: "Value" },
  }),
  ja: validateMessages({
    title: "タイトル",
    nested: { key: "値" },
  }),
});
```

## Next Steps

Now that you've mastered advanced usage patterns:

- [Check out the API Reference](/api-reference) for complete documentation
- [Learn why co-location matters](/why-this-library) for the philosophy behind i18n-at
- [Start with the Quick Start guide](/quick-start) if you're new to i18n-at
