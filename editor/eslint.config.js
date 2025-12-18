import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig } from "eslint/config";
import rootConfig from "../eslint.config.js";

export default defineConfig([
    ...rootConfig,
    {
        files: ["src/**/*.{ts,tsx}"],
        extends: [
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
        ],
    },
]);
