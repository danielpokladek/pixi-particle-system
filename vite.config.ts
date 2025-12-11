import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig(({ mode }) => ({
    build: {
        lib: {
            entry: "./src/index.ts",
            name: "PixiParticleSystem",
            fileName: "index",
            formats: ["es"],
        },
        rollupOptions: {
            external: ["pixi.js"],
            output: {
                globals: {
                    "pixi.js": "PIXI",
                },
            },
        },
        sourcemap: true,
        minify: mode === "production",
    },
    plugins: [
        dts({
            include: ["src/**/*"],
            outDir: "dist",
        }),
    ],
}));
