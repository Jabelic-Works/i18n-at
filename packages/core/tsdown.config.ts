import { defineConfig, type UserConfig } from "tsdown";

const shared = {
  format: ["esm", "cjs"],
  dts: {
    sourcemap: false,
  },
  deps: {
    neverBundle: ["react", "react/jsx-runtime"],
  },
  fixedExtension: false,
  outDir: "dist",
  sourcemap: false,
  target: "es2020",
  treeshake: true,
} satisfies UserConfig;

export default defineConfig([
  {
    ...shared,
    entry: { server: "src/server-only.ts" },
    clean: true,
    minify: true,
  },
  {
    ...shared,
    entry: { client: "src/client-only.ts" },
    clean: false,
    minify: false,
    banner: { js: '"use client";' },
  },
  {
    ...shared,
    entry: { index: "src/index.ts" },
    clean: false,
    minify: true,
  },
]);
