import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript", "next", "prettier"],
    rules: {
      "@typescript-eslint/no-empty-object-type": "off",
      // "@typescript-eslint/no-explicit-any": "off", // 临时关掉对any类型的检验，生成中不建议这样做
    },
  }),
  //...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
