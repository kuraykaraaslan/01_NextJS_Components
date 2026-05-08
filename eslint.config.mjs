import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// NOTE: eslint-plugin-tailwindcss is installed but intentionally NOT wired in.
// It requires a tailwind.config.js which does not exist in Tailwind CSS v4 —
// v4 uses a CSS-based config (@theme inline in globals.css). Wire this in once
// eslint-plugin-tailwindcss ships v4 support.

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
