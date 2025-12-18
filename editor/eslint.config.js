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
        rules: {
            "jsdoc/require-jsdoc": [
                "warn",
                {
                    require: {
                        FunctionDeclaration: true,
                        MethodDefinition: true,
                        ClassDeclaration: true,
                        ArrowFunctionExpression: false,
                        FunctionExpression: false,
                    },
                },
            ],
            "jsdoc/require-param": "off",
            "jsdoc/require-returns": "off",
        },
    },
]);
