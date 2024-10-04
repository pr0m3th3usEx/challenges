const globals = require("globals");
const pluginJs = require("@eslint/js");
const tseslint = require("typescript-eslint");
const eslintConfigPrettier = require("eslint-config-prettier");
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');


module.exports = [
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: globals.browser }},
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
        "max-len": [0, 120, 2, {
            ignoreUrls: true,
        }],
        "@typescript-eslint/no-unused-vars": ["warn", {
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^_",
            caughtErrorsIgnorePattern: "^_",
        }],
    }
  },
  {
    ignores: ['build/', 'node_modules/']
  }
];