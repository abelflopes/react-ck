/** @type import("eslint").Linter.Config */
const config = {
  extends: "../../../.eslintrc.js",
  ignorePatterns: ["icons/**/*", "dist/**/*"],
};

module.exports = config;
