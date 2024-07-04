/**
 * Eslint TS pro
 * https://www.npmjs.com/package/@abelflopes/eslint-config-tsr-pro
 *
 * Eslint compat
 * https://github.com/amilajack/eslint-plugin-compat
 */

/** @type import("eslint").Linter.Config */
const config = {
  extends: ["@abelflopes/eslint-config-tsr-pro", "plugin:compat/recommended"],
  plugins: ["compat"],
  rules: {
    "import/no-extraneous-dependencies": "off",
    "max-lines": [1, 300],
    "max-lines-per-function": [1, 200],
  },
  reportUnusedDisableDirectives: true,
  settings: {
    lintAllEsApis: true,
  },
};

module.exports = config;
