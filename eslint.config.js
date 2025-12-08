import js from "@eslint/js";
import jsdoc from "eslint-plugin-jsdoc";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig({
    files: ["src/**/*.ts"],
    extends: [
        js.configs.recommended,
        tseslint.configs.recommended,
        reactHooks.configs["recommended-latest"],
        reactRefresh.configs.vite,
        jsdoc.configs["flat/recommended-typescript"],
    ],
    languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
    },
    rules: {
        "@typescript-eslint/explicit-function-return-type": "error",
        "@typescript-eslint/member-ordering": "error",
        "jsdoc/require-param": [
            "warn",
            {
                checkDestructured: false,
                enableFixer: true,
            },
        ],
        "jsdoc/check-param-names": [
            "warn",
            {
                checkDestructured: false,
            },
        ],
        "jsdoc/require-jsdoc": [
            "warn",
            {
                contexts: ["TSInterfaceDeclaration", "TSTypeAliasDeclaration"],
                require: {
                    FunctionDeclaration: true,
                    MethodDefinition: true,
                    ClassDeclaration: true,
                    ArrowFunctionExpression: true,
                    FunctionExpression: false,
                },
            },
        ],
    },
});
