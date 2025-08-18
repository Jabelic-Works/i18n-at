import { defineConfig } from "tsup";

export default defineConfig([
  // Server-safe entry point
  {
    entry: { server: "src/server-only.ts" },
    format: ["cjs", "esm"],
    dts: true,
    clean: true,
    external: ["react"],
    treeshake: true,
    minify: true,
    splitting: false,
    target: "es2020",
  },
  // Client entry point
  {
    entry: { client: "src/client-only.ts" },
    format: ["cjs", "esm"],
    dts: true,
    clean: false,
    external: ["react"],
    treeshake: true,
    minify: false,
    splitting: false,
    target: "es2020",
    esbuildOptions: (options) => {
      options.jsx = "automatic";
    },
  },
  // Main entry point (shared utilities and types)
  {
    entry: { index: "src/index.ts" },
    format: ["cjs", "esm"],
    dts: true,
    clean: false,
    external: ["react"],
    treeshake: true,
    minify: true,
    splitting: false,
    target: "es2020",
  },
]);
