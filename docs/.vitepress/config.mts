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
      { text: "Quick Start", link: "/quick-start" },
      { text: "API Reference", link: "/api-reference" },
      { text: "Why i18n-at?", link: "/why-this-library" },
    ],

    sidebar: [
      {
        text: "Getting Started",
        items: [
          { text: "Quick Start", link: "/quick-start" },
          { text: "Why i18n-at?", link: "/why-this-library" },
        ],
      },
      {
        text: "Documentation",
        items: [
          { text: "API Reference", link: "/api-reference" },
          { text: "Advanced Usage", link: "/advanced-usage" },
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
