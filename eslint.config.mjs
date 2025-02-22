import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // 添加自定义规则
  {
    rules: {
      indent: ["error", 2], // 设置缩进为2个空格
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
];

export default eslintConfig;
