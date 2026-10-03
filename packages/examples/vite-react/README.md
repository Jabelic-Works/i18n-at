# Vite + React example

This example shows the same dashboard, navigation, feature cards, and interactive
buttons as the [Next.js App Router example](../nextjs-app/README.md). Its
navigation badge identifies the Vite + React runtime. The app uses
`I18nClientProvider`, `useI18n`, `useLocale`, and message interpolation.

From the repository root:

```bash
pnpm install
pnpm --dir packages/core build
pnpm --dir packages/examples/vite-react dev
```

Open the URL printed by Vite and switch between English, Japanese, and Chinese.
The selected locale is stored in the URL query string, so it survives a reload.
To check the production build, run:

```bash
pnpm --dir packages/examples/vite-react build
```

`defineMessages` comes from `i18n-at`. React hooks and the provider come from
`i18n-at/client`; the provider supplies the selected locale to components below
it. See [`src/messages.ts`](src/messages.ts) and [`src/App.tsx`](src/App.tsx)
for the complete example.
