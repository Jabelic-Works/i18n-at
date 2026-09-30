# Vite + React example

This example uses `i18n-at` in a client-rendered React app. It demonstrates
co-located messages, `I18nClientProvider`, `useI18n`, `useLocale`, interpolation,
and a language switcher without Next.js.

From the repository root:

```bash
pnpm install
pnpm --dir packages/core build
pnpm --dir packages/examples/vite-react dev
```

Open the URL printed by Vite and switch between English and Japanese. To check
the production build, run:

```bash
pnpm --dir packages/examples/vite-react build
```

`defineMessages` comes from `i18n-at`. React hooks and the provider come from
`i18n-at/client`; the provider supplies the selected locale to components below
it. See [`src/App.tsx`](src/App.tsx) for the complete example.
