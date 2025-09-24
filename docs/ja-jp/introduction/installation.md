# インストール

## 前提条件

- Node.js 16.8 以降
- Next.js 13.0 以降（App Router 使用）
- TypeScript 4.7 以降

## パッケージマネージャー

i18n-at はお好みのパッケージマネージャーでインストールできます：

### npm

```bash
npm install i18n-at
```

### yarn

```bash
yarn add i18n-at
```

### pnpm

```bash
pnpm add i18n-at
```

## プロジェクト構造

インストール後、通常は以下のようなプロジェクト構造になります：

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── layout.tsx
├── components/
│   └── Dashboard.tsx
└── messages.ts    # メッセージ定義
```

## 次のステップ

i18n-at がインストールできたら、[スタートガイド](/ja-jp/essentials/getting-started)に進んで、最初の国際化ページを設定しましょう。
