import typedocSidebar from "../api/typedoc-sidebar.json";

export default {
    base: "/pixi-particle-system/",
    title: "PixiJS Particle System",
    description: "Fast, powerful and intuitive particle system for PixiJS.",
    themeConfig: {
        nav: [
            { text: "Home", link: "/" },
            { text: "API", link: "/api" },
            {
                text: "Editor",
                link: "https://danielpokladek.github.io/pixi-particle-system/editor/",
            },
        ],
        sidebar: [
            {
                text: "API",
                items: typedocSidebar,
            },
        ],
        socialLinks: [
            {
                icon: "github",
                link: "https://github.com/danielpokladek/pixi-particle-system",
            },
        ],
        lastUpdated: {
            text: "Last Update",
            formatOptions: {
                dateStyle: "short",
                timeStyle: "short",
            },
        },
    },
};
