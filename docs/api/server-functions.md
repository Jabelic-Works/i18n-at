# Server Functions

Functions for using i18n-at in Server Components.

## getI18n

### Syntax

```typescript
function getI18n<T extends Messages>(
  messages: T,
  locale: string
): {
  t: TranslateFunction<T>;
  m: T[keyof T];
};
```

### Parameters

- `messages`: Message object created with `defineMessages`
- `locale`: Current locale string

### Returns

Object containing:

- `t`: Translation function that takes message reference and parameters
- `m`: Direct access to messages for current locale

### Example

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
