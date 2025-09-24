# i18n-at

型安全な Next.js App Router 向け国際化ツール

## 特徴

**🏆 型安全性**
TypeScript の完全サポートで、メッセージキーとパラメータの型チェックを提供

**📍 コロケーション**
コンポーネントと翻訳メッセージを同じ場所に配置

**🚀 IDE サポート**
翻訳メッセージへのコードジャンプ機能

**⚡ 高性能**
サーバーサイドレンダリングと静的サイト生成に最適化

## クイックスタート

```bash
npm install i18n-at
```

## サンプルコード

```tsx
import { defineMessages, useI18n } from "i18n-at";

const messages = defineMessages({
  greeting: "こんにちは、{name}さん！",
  itemCount: "{count}個のアイテム",
});

export default function MyComponent() {
  const { t } = useI18n();

  return (
    <div>
      <h1>{t(messages.greeting, { name: "ユーザー" })}</h1>
      <p>{t(messages.itemCount, { count: 5 })}</p>
    </div>
  );
}
```

## なぜ i18n-at を選ぶのか？

従来の i18n ソリューションとは異なり、i18n-at は：

- 翻訳メッセージとコンポーネントの**コロケーション**を実現
- TypeScript による**完全な型安全性**
- IDE での**メッセージ定義へのジャンプ**機能
- Next.js App Router に**完全対応**

[スタートガイドを読む →](/ja-jp/essentials/getting-started)
