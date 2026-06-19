import { mkdir } from "node:fs/promises";
import { rollup } from "rollup";
import dts from "rollup-plugin-dts";

const entries = {
  index: "src/index.ts",
  client: "src/client-only.ts",
  server: "src/server-only.ts",
};

await mkdir("dist", { recursive: true });

for (const [name, input] of Object.entries(entries)) {
  const bundle = await rollup({
    input,
    external: ["react", "react/jsx-runtime"],
    plugins: [dts()],
  });

  await bundle.write({
    file: `dist/${name}.d.ts`,
    format: "esm",
  });

  await bundle.write({
    file: `dist/${name}.d.cts`,
    format: "esm",
  });

  await bundle.close();
}
