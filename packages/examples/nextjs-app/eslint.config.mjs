import { fixupConfigRules } from "@eslint/compat";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = fixupConfigRules([
  ...nextVitals,
  ...nextTypescript,
]);

export default eslintConfig;
