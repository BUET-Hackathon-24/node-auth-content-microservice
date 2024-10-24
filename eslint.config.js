const eslintPluginPrettier = require("eslint-plugin-prettier");
const eslintPluginTypescript = require("@typescript-eslint/eslint-plugin");
const parser = require("@typescript-eslint/parser");

module.exports = [
  {
    ignores: ["node_modules"], // Ignore unnecessary folders
  },
  {
    files: ["src/**/*.ts"], // Specify TypeScript files to be linted
    languageOptions: {
      parser: parser,
    },
    plugins: {
      "@typescript-eslint": eslintPluginTypescript,
      prettier: eslintPluginPrettier,
    },
    rules: {
      "prettier/prettier": "error",
      "@typescript-eslint/explicit-module-boundary-types": "off",
    },
  },
];
