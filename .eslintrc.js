module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: "latest", // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  settings: {
    react: {
      version: "detect", // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    "mdx/code-blocks": true, // enable eslint on codeblocks in mdx
  },
  plugins: [
    "simple-import-sort", // use simple-import-sort to sort imports
    "unused-imports", // use unused-imports to remove unused imports
  ],
  extends: [
    "plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
    "plugin:react/jsx-runtime", // Enable the new react jsx runtime
    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    "plugin:react-hooks/recommended", // Use the recommended rules for react hooks
    "plugin:prettier/recommended", // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    // "plugin:storybook/recommended", // Enable eslint for storybook
    "plugin:jsx-a11y/recommended", // Check accessibility
    "plugin:sonarjs/recommended", // use sonarjs to check code complexity
    "next/core-web-vitals", // use recommended settings from nextjs
  ],
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": "off", // allow module exports to have implicit types
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": "off", // use unused-imports to remove unused imports
    "react/prop-types": "off", // disable prop-types rules. there is a bug that makes them false positive in forwardRef https://github.com/yannickcr/eslint-plugin-react/issues/3015
    "object-shorthand": ["warn", "always"], // always favor {shorthand} over longhand {shorthand: shorthand} object properties
    "simple-import-sort/imports": "warn", // enable simple-import-sort on imports
    "simple-import-sort/exports": "warn", // enable simple-import-sort on exports
    // disallow fragments in jsx due to emotion bug
    // see https://github.com/storybookjs/storybook/issues/7540
    "react/jsx-fragments": ["error", "element"],
    "unused-imports/no-unused-imports": "error", // enable unused-imports to remove unused imports
    "unused-imports/no-unused-vars": [
      // allow unused vars prefixed with underscore
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    "sonarjs/no-duplicate-string": "off", // allow duplicate strings. often purposeful for example to set styling
    "sonarjs/no-nested-template-literals": "off", // allow nested template literals. we use these for css
  },
  ignorePatterns: [
    "**/node_modules",
    "**/.*/",
    "**/dist",
    "public/scripts/iframeResizer.min.js",
  ], // ignore node_modules and build output and dot files
  overrides: [
    // enable eslint for mdx files
    {
      files: ["*.mdx"],
      extends: "plugin:mdx/recommended",
    },
  ],
};
