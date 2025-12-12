import js from "@eslint/js";
import jsdoc from "eslint-plugin-jsdoc";
import { defineConfig } from "eslint/config";
import tseslint, { parser } from "typescript-eslint";

export default defineConfig({
    extends: [
        js.configs.recommended,
        tseslint.configs.recommended,
        jsdoc.configs["flat/recommended-typescript"],
    ],
    languageOptions: {
        parser: parser,
        parserOptions: {
            project: "./tsconfig.json",
        },
        ecmaVersion: 2020,
    },
    rules: {
        "@typescript-eslint/explicit-function-return-type": "error",
        "@typescript-eslint/member-ordering": "error",
        "@typescript-eslint/prefer-readonly": "error",
        "no-console": "warn",
        "jsdoc/require-returns": [
            "error",
            {
                checkGetters: false,
            },
        ],
        "jsdoc/require-param": [
            "warn",
            {
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
                    ArrowFunctionExpression: false,
                    FunctionExpression: false,
                },
                exemptEmptyConstructors: true,
            },
        ],
    },
});
