# コンポーネントパターン

コンポーネントで翻訳を整理して使用するための高度なパターンを学びます。

## コロケーションメッセージ

メッセージをそれを使用するコンポーネントの近くに配置：

```typescript
// components/UserProfile/messages.ts
export const { messages: userProfileMessages } = defineMessages({
  en: {
    title: "User Profile",
    edit: "Edit Profile",
    save: "Save Changes",
    cancel: "Cancel",
  },
  ja: {
    title: "ユーザープロフィール",
    edit: "プロフィールを編集",
    save: "変更を保存",
    cancel: "キャンセル",
  },
});

// components/UserProfile/index.tsx
("use client");
import { useI18n } from "i18n-at";
import { userProfileMessages } from "./messages";

export function UserProfile() {
  const { t, m } = useI18n(userProfileMessages);

  return (
    <div>
      <h1>{t(m.title)}</h1>
      <button>{t(m.edit)}</button>
    </div>
  );
}
```

## 複合コンポーネント

共有翻訳を持つ複合コンポーネントを作成：

```typescript
// components/Card/messages.ts
const { messages: cardMessages } = defineMessages({
  en: {
    header: {
      title: "Card Title",
      subtitle: "Card Subtitle",
    },
    body: {
      content: "Card content goes here",
      readMore: "Read more",
    },
    footer: {
      actions: "Actions",
      share: "Share",
    },
  },
});

// components/Card/index.tsx
import { useI18n } from "i18n-at";
import { cardMessages } from "./messages";

function CardHeader() {
  const { t, m } = useI18n(cardMessages);
  return (
    <header>
      <h2>{t(m.header.title)}</h2>
      <p>{t(m.header.subtitle)}</p>
    </header>
  );
}

function CardBody({ showReadMore }: { showReadMore?: boolean }) {
  const { t, m } = useI18n(cardMessages);
  return (
    <div>
      <p>{t(m.body.content)}</p>
      {showReadMore && <a href="#">{t(m.body.readMore)}</a>}
    </div>
  );
}

function CardFooter() {
  const { t, m } = useI18n(cardMessages);
  return (
    <footer>
      <span>{t(m.footer.actions)}</span>
      <button>{t(m.footer.share)}</button>
    </footer>
  );
}

// 複合コンポーネントをエクスポート
export const Card = {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
};
```

## ポリモーフィックコンポーネント

異なるメッセージセットで動作するコンポーネントを作成：

```typescript
interface ButtonMessages {
  label: string;
  loading: string;
}

interface ButtonProps<T extends { button: ButtonMessages }> {
  messages: T;
  isLoading?: boolean;
  onClick?: () => void;
}

function Button<T extends { button: ButtonMessages }>({
  messages,
  isLoading,
  onClick,
}: ButtonProps<T>) {
  const { t, m } = useI18n(messages);

  return (
    <button onClick={onClick} disabled={isLoading}>
      {isLoading ? t(m.button.loading) : t(m.button.label)}
    </button>
  );
}

// 異なるメッセージセットでの使用
const { messages: authMessages } = defineMessages({
  en: {
    button: {
      label: "Sign In",
      loading: "Signing in...",
    },
  },
});

const { messages: saveMessages } = defineMessages({
  en: {
    button: {
      label: "Save",
      loading: "Saving...",
    },
  },
});

// 同じコンポーネントで両方が動作
<Button messages={authMessages} />
<Button messages={saveMessages} isLoading />
```

## 高次コンポーネント

翻訳ロジック用の HOC を作成：

```typescript
import { ComponentType } from "react";
import { useI18n, Messages } from "i18n-at";

function withTranslations<P extends object, M extends Messages>(
  Component: ComponentType<P & { t: any; m: any }>,
  messages: M
) {
  return function WithTranslationsComponent(props: P) {
    const { t, m } = useI18n(messages);
    return <Component {...props} t={t} m={m} />;
  };
}

// 使用例
const { messages } = defineMessages({
  en: { welcome: "Welcome!" },
});

function WelcomeComponent({ t, m }: { t: any; m: any }) {
  return <h1>{t(m.welcome)}</h1>;
}

export const Welcome = withTranslations(WelcomeComponent, messages);
```

## レンダープロップパターン

柔軟な翻訳レンダリングにレンダープロップを使用：

```typescript
interface TranslatorProps<T extends Messages> {
  messages: T;
  children: (t: any, m: any) => React.ReactNode;
}

function Translator<T extends Messages>({
  messages,
  children,
}: TranslatorProps<T>) {
  const { t, m } = useI18n(messages);
  return <>{children(t, m)}</>;
}

// 使用例
<Translator messages={messages}>
  {(t, m) => (
    <div>
      <h1>{t(m.title)}</h1>
      <p>{t(m.description)}</p>
    </div>
  )}
</Translator>;
```

## 動的コンポーネントメッセージ

動的コンポーネントシナリオを処理：

```typescript
// フィールド固有のメッセージを持つ動的フォーム
const { messages: formMessages } = defineMessages({
  en: {
    fields: {
      email: {
        label: "Email",
        placeholder: "Enter your email",
        error: "Invalid email address",
      },
      password: {
        label: "Password",
        placeholder: "Enter your password",
        error: "Password must be at least 8 characters",
      },
    },
  },
});

type FieldName = "email" | "password";

function FormField({ fieldName }: { fieldName: FieldName }) {
  const { t, m } = useI18n(formMessages);
  const field = m.fields[fieldName];

  return (
    <div>
      <label>{t(field.label)}</label>
      <input placeholder={t(field.placeholder)} />
      <span className="error">{t(field.error)}</span>
    </div>
  );
}
```

## メッセージ合成

複数のソースからメッセージを合成：

```typescript
// 共有メッセージ
const { messages: commonMessages } = defineMessages({
  en: {
    actions: {
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
    },
    status: {
      loading: "Loading...",
      error: "An error occurred",
    },
  },
});

// 機能固有のメッセージ
const { messages: profileMessages } = defineMessages({
  en: {
    title: "Edit Profile",
    nameLabel: "Full Name",
  },
});

// コンポーネントで合成
function EditProfile() {
  const { t: tCommon, m: mCommon } = useI18n(commonMessages);
  const { t: tProfile, m: mProfile } = useI18n(profileMessages);

  return (
    <form>
      <h1>{tProfile(mProfile.title)}</h1>
      <label>{tProfile(mProfile.nameLabel)}</label>
      <button type="submit">{tCommon(mCommon.actions.save)}</button>
      <button type="button">{tCommon(mCommon.actions.cancel)}</button>
    </form>
  );
}
```

## ベストプラクティス

1. **デフォルトでコロケーション** - メッセージをコンポーネントと一緒に配置
2. **共通メッセージを共有** - 頻繁に使用されるメッセージを抽出
3. **合成を使用** - 必要に応じてメッセージセットを結合
4. **パターンに型を付ける** - 高度なパターンで型安全性を保証
