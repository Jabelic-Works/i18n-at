import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "i18n-at",
  description:
    "Type-safe internationalization tool for Next.js App Router with co-location and IDE code jumping",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/introduction/what-is-i18n-at" },
      { text: "API", link: "/api/core-functions" },
    ],

    sidebar: [
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
          { text: "Variable Interpolation", link: "/essentials/interpolation" },
          { text: "Server Components", link: "/essentials/server-components" },
          { text: "Client Components", link: "/essentials/client-components" },
        ],
      },
      {
        text: "Advanced",
        items: [
          { text: "TypeScript Support", link: "/advanced/typescript-support" },
          { text: "Component Patterns", link: "/advanced/component-patterns" },
          { text: "Lazy Loading", link: "/advanced/lazy-loading" },
          { text: "Performance Optimization", link: "/advanced/optimization" },
        ],
      },
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

    socialLinks: [
      { icon: "github", link: "https://github.com/jabelic/i18n-at" },
    ],

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2024 Jabelic",
    },

    editLink: {
      pattern: "https://github.com/jabelic/i18n-at/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },

    search: {
      provider: "local",
    },
  },
});
