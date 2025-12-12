import reactHooks from "eslint-plugin-react-hooks";
import { defineConfig } from "vite";
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
