/** @type import("eslint").Linter.Config */
const config = {
  extends: "@abelflopes/eslint-config-tsr-pro",
  rules: {
    "import/no-extraneous-dependencies": "off",
  },
};

module.exports = config;
