# サーバー関数

サーバーコンポーネントで i18n-at を使用するための関数です。

## getI18n

### 構文

```typescript
function getI18n<T extends Messages>(
  messages: T,
  locale: string
): {
  t: TranslateFunction<T>;
  m: T[keyof T];
};
```

### 引数

- `messages`: `defineMessages`で作成されたメッセージオブジェクト
- `locale`: 現在のロケール文字列

### 戻り値

以下を含むオブジェクト：

- `t`: メッセージ参照とパラメータを受け取る翻訳関数
- `m`: 現在のロケールのメッセージへの直接アクセス

### 例

```typescript
// app/[locale]/page.tsx
import { getI18n } from "i18n-at";
import { messages } from "@/messages";

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t, m } = getI18n(messages, locale);

  return (
    <div>
      <h1>{t(m.title)}</h1>
      <p>{t(m.welcome, { name: "User" })}</p>
    </div>
  );
}
```
