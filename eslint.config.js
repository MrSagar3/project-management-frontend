import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import pluginUnusedImports from "eslint-plugin-unused-imports";
import pluginImport from "eslint-plugin-import";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,tsx}"] },
  { files: ["**/*.js"], languageOptions: { sourceType: "module" } },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        Express: true,
        describe: true,
        it: true,
        beforeEach: true,
      },
    },
  },

  pluginJs.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "unused-imports": pluginUnusedImports,
      import: pluginImport,
    },
    rules: {
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
          caughtErrors: "none",
        },
      ],
      "no-unused-vars": "off",
      "@typescript-eslint/explicit-module-boundary-types": 0,
      "no-useless-escape": 0,
      "no-useless-catch": 0,
      "@typescript-eslint/no-explicit-any": 0,
      "import/order": [
        "error",
        {
          groups: [
            ["builtin", "external"],
            ["internal"],
            ["parent", "sibling", "index"],
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  {
    ignores: [
      "node_modules/",
      "public/",
      "dist/",
      "src/vite-env.d.ts",
      "vite.config.ts",
    ],
  },
];
