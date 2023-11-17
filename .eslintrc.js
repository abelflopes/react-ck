/** @type import("eslint").Linter.Config */
const config = {
  extends: "@abelflopes/eslint-config-tsr-pro",
  rules: {
    "@typescript-eslint/promise-function-async": 1,
    "import/no-unresolved": 0,
    "unicorn/prefer-spread": 0,
    "unicorn/prevent-abbreviations": 0,
    "unicorn/no-array-reduce": 0,
    "unicorn/no-useless-undefined": 0,
    "@typescript-eslint/consistent-type-assertions": [2, { assertionStyle: "never" }],
    // Eslint comments
    // "eslint-comments/disable-enable-pair": 0,
    "eslint-comments/no-aggregating-enable": 2,
    "eslint-comments/no-duplicate-disable": 2,
    "eslint-comments/no-unlimited-disable": 2,
    "eslint-comments/no-unused-disable": 2,
    "eslint-comments/no-unused-enable": 2,
    "eslint-comments/no-restricted-disable": 2,
    // "eslint-comments/no-use": 0,
    "eslint-comments/require-description": 1,
  },
};

module.exports = config;
