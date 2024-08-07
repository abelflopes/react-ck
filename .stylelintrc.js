/**
 * Stylelint
 * https://stylelint.io/user-guide/configure/#severity
 *
 * Stylelint SCSS
 * https://www.npmjs.com/package/stylelint-scss
 * Stylelint scss is implemented through:
 * https://github.com/stylelint-scss/stylelint-config-standard-scss/blob/main/index.js
 * https://github.com/stylelint-scss/stylelint-config-recommended-scss/blob/master/index.js
 *
 * Stylelint CSS modules
 * https://www.npmjs.com/package/stylelint-config-css-modules
 * https://github.com/pascalduez/stylelint-config-css-modules/blob/main/index.js
 *
 * Stylelint prettier
 * https://www.npmjs.com/package/stylelint-prettier
 *
 * Stylelint order
 * https://www.npmjs.com/package/stylelint-order
 *
 * No unsupported browser features
 * https://www.npmjs.com/package/stylelint-no-unsupported-browser-features
 *
 */

/** @type import("stylelint").Config */

const config = {
  extends: [
    "stylelint-config-standard-scss",
    "stylelint-config-css-modules",
    "stylelint-prettier/recommended",
    "stylelint-config-idiomatic-order",
  ],
  plugins: ["stylelint-no-unsupported-browser-features"],
  defaultSeverity: "warning",
  reportDescriptionlessDisables: true,
  reportNeedlessDisables: true,
  reportInvalidScopeDisables: true,
  rules: {
    "at-rule-disallowed-list": [
      "import",
      {
        severity: "warning",
      },
    ],
    "scss/no-global-function-names": [
      true,
      {
        severity: "error",
      },
    ],
    "scss/no-unused-private-members": [
      true,
      {
        severity: "error",
      },
    ],
    "scss/load-no-partial-leading-underscore": [
      true,
      {
        severity: "error",
      },
    ],
    "scss/at-use-no-redundant-alias": [
      true,
      {
        severity: "error",
      },
    ],
    "scss/at-use-no-unnamespaced": [
      true,
      {
        severity: "error",
      },
    ],
    "scss/at-rule-no-unknown": [
      true,
      {
        severity: "error",
      },
    ],
    "scss/property-no-unknown": [
      true,
      {
        severity: "error",
      },
    ],
    "scss/function-no-unknown": [
      true,
      {
        severity: "error",
      },
    ],
    "plugin/no-unsupported-browser-features": [
      true,
      {
        ignore: ["css-nesting"],
        severity: "warning",
      },
    ],
  },
  // https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint
  overrides: [
    {
      files: ["**/*.scss"],
      customSyntax: "postcss-scss",
    },
  ],
};

module.exports = config;
