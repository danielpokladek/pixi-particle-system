import { defineConfig } from "vite";

export default defineConfig({
    root: "editor",
    base: "/pixi-particle-system/editor/",
    build: {
        outDir: "../dist-editor",
        emptyOutDir: true,
    },
});
