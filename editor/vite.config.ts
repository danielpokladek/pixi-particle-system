import { defineConfig } from "vite";

export default defineConfig({
    base: "/pixi-particle-system/editor/",
    build: {
        target: "esnext",
        outDir: "../dist-editor",
        emptyOutDir: true,
    },
    server: {
        host: true,
        port: 3000,
    },
});
