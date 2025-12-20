import typedocSidebar from "../api/typedoc-sidebar.json";

/**
 * Parses TypeDoc sidebar and groups items by their group tags.
 * @param {Array} sidebar - The TypeDoc sidebar array
 * @returns {Array} Restructured sidebar with grouped items
 */
function parseGroupedSidebar(sidebar) {
    const groups = {};
    const standardCategories = [
        "Classes",
        "Interfaces",
        "Type Aliases",
        "Functions",
    ];

    // Process each sidebar item
    sidebar.forEach((category) => {
        // Skip standard categories
        if (standardCategories.includes(category.text)) {
            return;
        }

        // Extract group hierarchy from category text (e.g., "Behavior/AlphaBehavior")
        const parts = category.text.split("/");

        if (parts.length === 0) return;

        // Build nested structure
        let current = groups;
        parts.forEach((part, index) => {
            if (!current[part]) {
                current[part] = {
                    text: formatGroupName(part),
                    collapsed: true,
                    items: index === parts.length - 1 ? category.items : [],
                };
            }

            if (index < parts.length - 1) {
                if (!current[part].children) {
                    current[part].children = {};
                }
                current = current[part].children;
            }
        });
    });

    // Convert nested object to array structure
    return convertGroupsToArray(groups);
}

/**
 * Formats group names (e.g., "AlphaBehavior" -> "Alpha Behavior")
 */
function formatGroupName(name) {
    return name
        .replace(/([A-Z])/g, " $1")
        .trim()
        .replace(/\s+/g, " ");
}

/**
 * Recursively converts group object structure to VitePress sidebar array
 */
function convertGroupsToArray(groups) {
    return Object.values(groups).map((group) => {
        const item = {
            text: group.text,
            collapsed: group.collapsed,
            items: [...group.items],
        };

        if (group.children) {
            item.items.push(...convertGroupsToArray(group.children));
        }

        return item;
    });
}

const groupedSidebar = parseGroupedSidebar(typedocSidebar);

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
                items: groupedSidebar,
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
