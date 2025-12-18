import { defineConfig } from "vite";

export default defineConfig({
    base: "/pixi-particle-system/editor/",
    build: {
        target: "esnext",
        outDir: "../editor/dist",
        emptyOutDir: true,
    },
    server: {
        host: true,
        port: 3000,
    },
});
