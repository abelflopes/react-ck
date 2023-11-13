/** @type import("eslint").Linter.Config */
const config = {
  extends: "@abelflopes/eslint-config-tsr-pro",
  rules: {
    "import/no-unresolved": 0,
    "unicorn/prefer-spread": 0,
    "unicorn/prevent-abbreviations": 0,
    "unicorn/no-array-reduce": 0,
    "unicorn/no-useless-undefined": 0,
  },
};

module.exports = config;
