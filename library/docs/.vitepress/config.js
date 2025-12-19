import typedocSidebar from "../api/typedoc-sidebar.json";

export default {
    base: "/pixi-particle-system/",
    title: "PixiJS Particle System",
    description: "Fast, powerful and intuitive particle system for PixiJS.",
    themeConfig: {
        search: {
            provider: "local",
        },
        nav: [
            { text: "Home", link: "/" },
            {
                text: "Editor",
                link: "https://danielpokladek.github.io/pixi-particle-system/editor/",
            },
        ],
        sidebar: [
            {
                text: "Introduction",
                collapsed: false,
                items: [
                    {
                        text: "What is Particle System?",
                        link: "/first-steps/what-is-it",
                    },
                    {
                        text: "Getting Started",
                        link: "/first-steps/getting-started",
                    },
                    {
                        text: "Behavior System",
                        link: "/first-steps/behavior-system",
                    },
                ],
            },
            {
                text: "Customization",
                collapsed: true,
                items: [
                    {
                        text: "Custom Behaviors",
                        link: "/custom-behavior",
                    },
                ],
            },
            {
                text: "API Reference",
                collapsed: true,
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
