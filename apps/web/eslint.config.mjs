import js from "@eslint/js";
import eslintReact from "@eslint-react/eslint-plugin";
import reactHooks from "eslint-plugin-react-hooks";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores([".next/**", "out/**", "next-env.d.ts"]),
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      eslintReact.configs["recommended-typescript"],
      reactHooks.configs.flat.recommended,
      eslintReact.configs["disable-conflict-eslint-plugin-react-hooks"],
    ],
  },
]);
