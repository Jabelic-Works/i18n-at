import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "i18n-at",
  description:
    "Type-safe internationalization tool for Next.js App Router with co-location and IDE code jumping",
  cleanUrls: true,

  locales: {
    root: {
      label: "English",
      lang: "en-US",
      title: "i18n-at",
      description:
        "Type-safe internationalization tool for Next.js App Router with co-location and IDE code jumping",
      themeConfig: {
        nav: [
          { text: "Home", link: "/" },
          { text: "Guide", link: "/introduction/what-is-i18n-at" },
          { text: "API", link: "/api/core-functions" },
        ],
        editLink: {
          pattern: "https://github.com/jabelic/i18n-at/edit/main/docs/:path",
          text: "Edit this page on GitHub",
        },
      },
    },
    "ja-jp": {
      label: "日本語",
      lang: "ja-JP",
      title: "i18n-at",
      description:
        "Next.js App Routerのための型安全なi18nツール、コロケーションとIDEのコードジャンプ機能付き",
      link: "/ja-jp/",
      themeConfig: {
        nav: [
          { text: "ホーム", link: "/ja-jp/" },
          { text: "ガイド", link: "/ja-jp/introduction/what-is-i18n-at" },
          { text: "API", link: "/ja-jp/api/core-functions" },
        ],
        editLink: {
          pattern: "https://github.com/jabelic/i18n-at/edit/main/docs/:path",
          text: "GitHubでこのページを編集",
        },
      },
    },
  },
  head: [
    ["meta", { name: "theme-color", content: "#646cff" }],
    ["meta", { name: "og:type", content: "website" }],
    ["meta", { name: "og:locale", content: "en" }],
    ["meta", { name: "og:site_name", content: "i18n-at" }],
    // ["meta", { name: "og:image", content: "https://i18n-at.dev/og-image.png" }],
  ],
  // sitemap: {
  //   hostname: "https://i18n-at.dev",
  // },
  ignoreDeadLinks: [
    // Ignore old files that are being migrated
    /^\/api-reference/,
    /^\/essentials\/pluralization/,
    /^\/advanced\/component-interpolation/,
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    sidebar: {
      "/": [
        {
          text: "Introduction",
          items: [
            { text: "What is i18n-at?", link: "/introduction/what-is-i18n-at" },
            { text: "Installation", link: "/introduction/installation" },
          ],
        },
        {
          text: "Essentials",
          items: [
            { text: "Getting Started", link: "/essentials/getting-started" },
            { text: "Configuration", link: "/essentials/configuration" },
            {
              text: "Message Format Syntax",
              link: "/essentials/message-format-syntax",
            },
            {
              text: "Variable Interpolation",
              link: "/essentials/interpolation",
            },
            {
              text: "Server Components",
              link: "/essentials/server-components",
            },
            {
              text: "Client Components",
              link: "/essentials/client-components",
            },
          ],
        },
        // {
        //   text: "Advanced",
        //   items: [
        //     {
        //       text: "TypeScript Support",
        //       link: "/advanced/typescript-support",
        //     },
        //     {
        //       text: "Component Patterns",
        //       link: "/advanced/component-patterns",
        //     },
        //     { text: "Lazy Loading", link: "/advanced/lazy-loading" },
        //     {
        //       text: "Performance Optimization",
        //       link: "/advanced/optimization",
        //     },
        //   ],
        // },
        {
          text: "API Reference",
          items: [
            { text: "Core Functions", link: "/api/core-functions" },
            { text: "Server Functions", link: "/api/server-functions" },
            { text: "Client Functions", link: "/api/client-functions" },
            { text: "Type Definitions", link: "/api/types" },
          ],
        },
      ],
      "/ja-jp/": [
        {
          text: "はじめに",
          items: [
            {
              text: "i18n-atとは？",
              link: "/ja-jp/introduction/what-is-i18n-at",
            },
            { text: "インストール", link: "/ja-jp/introduction/installation" },
          ],
        },
        {
          text: "基本機能",
          items: [
            {
              text: "スタートガイド",
              link: "/ja-jp/essentials/getting-started",
            },
            { text: "設定", link: "/ja-jp/essentials/configuration" },
            {
              text: "メッセージフォーマット",
              link: "/ja-jp/essentials/message-format-syntax",
            },
            { text: "変数の補間", link: "/ja-jp/essentials/interpolation" },
            {
              text: "サーバーコンポーネント",
              link: "/ja-jp/essentials/server-components",
            },
            {
              text: "クライアントコンポーネント",
              link: "/ja-jp/essentials/client-components",
            },
          ],
        },
        // {
        //   text: "高度な使い方",
        //   items: [
        //     {
        //       text: "TypeScript サポート",
        //       link: "/ja-jp/advanced/typescript-support",
        //     },
        //     {
        //       text: "コンポーネントパターン",
        //       link: "/ja-jp/advanced/component-patterns",
        //     },
        //     { text: "遅延読み込み", link: "/ja-jp/advanced/lazy-loading" },
        //     {
        //       text: "パフォーマンス最適化",
        //       link: "/ja-jp/advanced/optimization",
        //     },
        //   ],
        // },
        {
          text: "API リファレンス",
          items: [
            { text: "コア関数", link: "/ja-jp/api/core-functions" },
            { text: "サーバー関数", link: "/ja-jp/api/server-functions" },
            { text: "クライアント関数", link: "/ja-jp/api/client-functions" },
            { text: "型定義", link: "/ja-jp/api/types" },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/jabelic/i18n-at" },
    ],

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2025 Jabelic",
    },

    search: {
      provider: "local",
    },
  },
});
