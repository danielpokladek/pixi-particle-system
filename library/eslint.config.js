import { defineConfig } from "eslint/config";
import rootConfig from "../eslint.config.js";

export default defineConfig([
    ...rootConfig,
    {
        files: ["src/**/*.ts"],
    },
]);
