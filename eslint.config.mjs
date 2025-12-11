import path from "node:path";

import { includeIgnoreFile } from "@eslint/compat";
import js from "@eslint/js";
import { configs, plugins } from "eslint-config-airbnb-extended";
import { rules as prettierConfigRules } from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

const gitignorePath = path.resolve(".", ".gitignore");

const jsConfig = [
  // ESLint Recommended Rules
  {
    name: "js/config",
    ...js.configs.recommended,
  },
  // Stylistic Plugin
  plugins.stylistic,
  // Import X Plugin
  plugins.importX,
  // Airbnb Base Recommended Config
  ...configs.base.recommended,
];

const nextConfig = [
  // React Plugin
  plugins.react,
  // React Hooks Plugin
  plugins.reactHooks,
  // React JSX A11y Plugin
  plugins.reactA11y,
  // Next Plugin
  plugins.next,
  // Airbnb Next Recommended Config
  ...configs.next.recommended,
];

const typescriptConfig = [
  // TypeScript ESLint Plugin
  plugins.typescriptEslint,
  // Airbnb Base TypeScript Config
  ...configs.base.typescript,
  // Airbnb Next TypeScript Config
  ...configs.next.typescript,
];

const prettierConfig = [
  // Prettier Plugin
  {
    name: "prettier/plugin/config",
    plugins: {
      prettier: prettierPlugin,
    },
  },
  // Prettier Config
  {
    name: "prettier/config",
    rules: {
      ...prettierConfigRules,
      "prettier/prettier": "error",
    },
  },
];

// Next.js App Router - default export allowed
const appRouterConfig = {
  files: [
    "**/app/**/{page,layout,loading,error,not-found,global-error}.{ts,tsx}",
    "**/app/**/{template,default}.{ts,tsx}",
    "**/app/**/route.{ts,tsx}",
  ],
  rules: {
    "import-x/no-default-export": "off",
    "import-x/prefer-default-export": "off",
  },
};

// Next.js Pages Router - default export allowed
const pagesRouterConfig = {
  files: ["**/pages/**/*.{ts,tsx}", "**/pages/api/**/*.{ts,tsx}"],
  rules: {
    "import-x/no-default-export": "off",
    "import-x/prefer-default-export": "off",
  },
};

// Config files - default export allowed
const configFilesConfig = {
  files: [
    "**/*.config.{js,ts,mjs,cjs,mts}",
    "**/middleware.ts",
    "**/instrumentation.ts",
  ],
  rules: {
    "import-x/no-default-export": "off",
    "import-x/no-extraneous-dependencies": "off",
  },
};

// Custom Rules Configuration
const customConfig = {
  files: ["**/*.{ts,tsx}"],
  languageOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect",
    },
    // import-x settings for TypeScript and Next.js
    "import-x/resolver": {
      typescript: {
        project: ["./tsconfig.json"],
        alwaysTryTypes: true,
      },
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
    "import-x/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import-x/internal-regex": "^@/",
  },
  rules: {
    // Console
    "no-console": ["warn", { allow: ["error", "warn"] }],

    // General
    "consistent-return": "off",
    "no-use-before-define": "off",
    "no-plusplus": "off",
    "no-param-reassign": ["error", { props: false }],

    // React
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off",
    "react/require-default-props": "off",
    "react/jsx-props-no-spreading": "off",
    "react/function-component-definition": "off",
    "react/jsx-no-useless-fragment": ["error", { allowExpressions: true }],
    "react/prop-types": "off",

    // TypeScript
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],

    // Import-X
    "import-x/no-unresolved": "off",
    "import-x/extensions": "off",
    "import-x/prefer-default-export": "off",
    "import-x/no-extraneous-dependencies": "off",
    "import-x/first": "error",
    "import-x/no-duplicates": "error",
    "import-x/newline-after-import": ["error", { count: 1 }],
    "import-x/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          ["parent", "sibling", "index"],
          "type",
        ],
        "newlines-between": "always",
        alphabetize: { order: "asc", caseInsensitive: true },
        pathGroups: [
          { pattern: "react", group: "external", position: "before" },
          { pattern: "react-dom", group: "external", position: "before" },
          { pattern: "next", group: "external", position: "before" },
          { pattern: "next/**", group: "external", position: "before" },
          { pattern: "@/**", group: "internal", position: "before" },
        ],
        pathGroupsExcludedImportTypes: ["react", "react-dom", "next"],
        warnOnUnassignedImports: true,
      },
    ],

    // JSX A11y
    "jsx-a11y/label-has-associated-control": [
      "error",
      {
        assert: "either",
        controlComponents: ["Input"],
        depth: 3,
      },
    ],
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["Link"],
        specialLink: ["hrefLeft", "hrefRight"],
        aspects: ["invalidHref", "preferButton"],
      },
    ],
  },
};

export default [
  // Ignore .gitignore files/folder in eslint
  includeIgnoreFile(gitignorePath),
  // Javascript Config
  ...jsConfig,
  // Next Config
  ...nextConfig,
  // TypeScript Config
  ...typescriptConfig,
  // Prettier Config
  ...prettierConfig,
  // Custom Rules
  customConfig,
  // Next.js Specific Configs
  appRouterConfig,
  pagesRouterConfig,
  configFilesConfig,
];
