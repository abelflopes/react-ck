import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import jsxA11y from "eslint-plugin-jsx-a11y";
import workspaces from "eslint-plugin-workspaces";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import importPlugin from "eslint-plugin-import";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import jest from "eslint-plugin-jest";
import compat from "eslint-plugin-compat";
import tsDoc from "eslint-plugin-tsdoc";
import comments from "@eslint-community/eslint-plugin-eslint-comments/configs";
import stylistic from "@stylistic/eslint-plugin";
import pluginPromise from "eslint-plugin-promise";

/** @type import("@eslint/config-helpers").ConfigWithExtendsArray */
const config = [
  globalIgnores([
    ".nx/*",
    "**/coverage/**",
    "**/dist/**",
    "**/*api*/**/types.ts",
    "**/playwright-report/**",
  ]),
  {
    name: "node",
    files: ["**/*.config.{js,mjs,cjs,ts,mts,cts,jsx,tsx}", "**/*rc.js"],
    languageOptions: { globals: globals.node },
  },
  {
    name: "ts parser",
    files: ["**/src/**/*.*{ts,tsx}"],
    languageOptions: {
      globals: { ...globals.browser, process: true, System: true },
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    name: "js",
    ...js.configs.recommended,
    files: ["**/src/**/*.{js,jsx}"],
  },
  {
    name: "js / ts",
    ...js.configs.recommended,
    files: ["**/src/**/*.{ts,tsx}"],
    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": "off",
      "block-scoped-var": "warn",
      "complexity": ["warn", { max: 45 }],
      "default-case": "error",
      "default-param-last": "error",
      "dot-notation": "warn",
      "eqeqeq": "error",
      "func-name-matching": "warn",
      "max-classes-per-file": "error",
      "max-depth": ["warn", 5],
      "max-lines": ["warn", 450],
      "max-params": "warn",
      "no-alert": "warn",
      "no-bitwise": "error",
      "no-caller": "error",
      "no-console": "warn",
      "no-constructor-return": "error",
      "no-duplicate-imports": "error",
      "no-empty-function": "warn",
      "no-extend-native": "error",
      "no-lone-blocks": "error",
      "no-lonely-if": "error",
      "no-loop-func": "error",
      "no-magic-numbers": [
        "warn",
        {
          ignore: [0, 1],
          ignoreDefaultValues: true,
          ignoreArrayIndexes: true,
        },
      ],
      "vars-on-top": "warn",
      "yoda": "error",
    },
  },
  stylistic.configs.customize({
    indent: 2,
    quotes: "single",
    semi: false,
    jsx: true,
  }),
  tseslint.configs.strictTypeChecked.map((config) => ({
    ...config,
    files: ["**/src/**/*.{ts,tsx}"],
    ignores: ["**/*.config.ts"],
    rules: {
      ...config.rules,
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-misused-spread": "warn",
      "@typescript-eslint/no-confusing-void-expression": "off",
      "@typescript-eslint/restrict-template-expressions": ["error", { allowNumber: true }],
      "@typescript-eslint/no-extraneous-class": "off",
      "@typescript-eslint/consistent-type-assertions": [
        "warn",
        {
          assertionStyle: "never",
        },
      ],
      "@typescript-eslint/default-param-last": "error",
    },
  })),
  {
    ...reactRefresh.configs.recommended,
    files: ["**/src/**/*.{ts,tsx}"],
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      "react-refresh/only-export-components": "warn",
    },
  },
  {
    ...reactHooks.configs["recommended-latest"],
    files: ["**/src/**/*.tsx"],
    rules: {
      ...reactHooks.configs["recommended-latest"].rules,
      "react-hooks/exhaustive-deps": "error",
    },
  },
  {
    name: "react",
    ...pluginReact.configs.flat.recommended,
    files: ["**/*.tsx", "**/src/**/*.ts"],
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/display-name": "off",
    },
  },
  {
    ...pluginPromise.configs["flat/recommended"],
    files: ["**/*.{ts,tsx}"],
  },
  {
    ...compat.configs["flat/recommended"],
    files: ["**/*.{ts,tsx}"],
    rules: {
      ...compat.configs["flat/recommended"].rules,
      "compat/compat": "warn",
    },
    settings: {
      lintAllEsApis: true,
    },
  },
  {
    ...eslintPluginUnicorn.configs.recommended,
    files: ["**/*.{ts,tsx}"],
    rules: {
      ...eslintPluginUnicorn.configs.recommended.rules,
      "unicorn/prevent-abbreviations": "off",
      "unicorn/no-null": "off",
      "unicorn/no-array-reduce": "off",
      "unicorn/no-array-for-each": "off",
      "unicorn/explicit-length-check": "off",
      "unicorn/no-anonymous-default-export": "off",
      "unicorn/new-for-builtins": "off",
      "unicorn/no-static-only-class": "off",
      "unicorn/prefer-module": "off",
      "unicorn/catch-error-name": "off",
      "unicorn/prefer-top-level-await": "off",
      "unicorn/prefer-at": "off",
      "unicorn/prefer-string-replace-all": "off",
      "unicorn/filename-case": [
        "warn",
        {
          cases: {
            kebabCase: true,
            pascalCase: true,
          },
        },
      ],
    },
  },
  {
    ...comments.recommended,
    files: ["**/*.{ts,tsx}"],
    rules: {
      ...comments.recommended.rules,
      "@eslint-community/eslint-comments/require-description": "warn",
      "@eslint-community/eslint-comments/no-unused-disable": "error",
    },
  },
  // {
  //   ...importPlugin.flatConfigs.recommended,
  //   files: ["**/*.{ts,tsx}"],
  //   rules: {
  //     ...importPlugin.flatConfigs.recommended.rules,
  //     "import/no-unresolved": "off",
  //   },
  // },
  {
    name: "tsdoc",
    plugins: { tsdoc: tsDoc },
    rules: {
      "tsdoc/syntax": "warn",
    },
    files: ["**/*.{ts,tsx}"],
  },
  {
    name: "jest",
    ...jest.configs["flat/recommended"],
    files: ["**/*.*{spec,test}*.ts*"],
    rules: {
      ...jest.configs["flat/recommended"].rules,
      "@typescript-eslint/unbound-method": "off",
    },
  },
  {
    ...jsxA11y.flatConfigs.recommended,
    files: ["**/src/**/*.tsx"],
  },
  eslintPluginPrettierRecommended,
  workspaces.configs["flat/recommended"],
];

export default defineConfig(config);
