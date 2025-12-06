import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

const config = [
  ...nextCoreWebVitals,
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error",
      "max-len": ["error", { code: 120, ignoreUrls: true, ignoreStrings: true }],
    },
  },
  prettierConfig,
];

export default config;
