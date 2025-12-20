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
        "@typescript-eslint/member-ordering": [
            "error",
            {
                default: {
                    memberTypes: [
                        // Fields
                        "private-static-field",
                        "protected-static-field",
                        "public-static-field",

                        "private-instance-field",
                        "protected-instance-field",
                        "public-instance-field",

                        // Constructors
                        "constructor",

                        // Getters & Setters (grouped together)
                        ["public-instance-get", "public-instance-set"],
                        ["protected-instance-get", "protected-instance-set"],
                        ["private-instance-get", "private-instance-set"],

                        // Methods
                        "public-instance-method",
                        "protected-instance-method",
                        "private-instance-method",
                    ],
                    order: "as-written",
                },
            },
        ],
        "@typescript-eslint/explicit-function-return-type": "error",
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
                checkSetters: false,
            },
        ],
        "jsdoc/check-tag-names": [
            "warn",
            {
                definedTags: ["hidden"],
            },
        ],
    },
});
