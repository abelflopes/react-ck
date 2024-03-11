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
  },
  settings: {
    lintAllEsApis: true,
  },
};

module.exports = config;
