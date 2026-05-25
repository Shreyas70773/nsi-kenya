import coreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...coreWebVitals,
  ...nextTypescript,
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "node_modules/**",
      "convex/_generated/**",
      "playwright-report/**",
      "test-results/**",
    ],
  },
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "jsx-a11y/alt-text": "error",
      // Modern React + Next.js handle straight apostrophes fine; the rule
      // is more noise than value for our copy-heavy pages.
      "react/no-unescaped-entities": "off",
    },
  },
  {
    files: ["scripts/**/*.ts", "tests/**/*.{ts,tsx}"],
    rules: {
      "no-console": "off",
    },
  },
];
