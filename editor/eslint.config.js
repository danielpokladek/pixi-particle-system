import { defineConfig } from "vite";
import rootConfig from "../eslint.config.js";

export default defineConfig([
    ...rootConfig,
    {
        files: ["src/**/*.ts"],
    },
]);
