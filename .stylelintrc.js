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
 *
 * Stylelint prettier
 * https://www.npmjs.com/package/stylelint-prettier
 *
 * Stylelint order
 * https://www.npmjs.com/package/stylelint-order
 *
 * No unsupported browser features
 * https://www.npmjs.com/package/stylelint-no-unsupported-browser-features
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
  rules: {
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
};

module.exports = config;
