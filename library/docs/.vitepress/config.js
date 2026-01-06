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

        // Check if this has a trailing slash in original text
        const hasTrailingSlash = category.text.endsWith("/");

        // Remove trailing slash if present (treats "Group/" same as "Group")
        const normalizedText = category.text.replace(/\/$/, "");

        // Extract group hierarchy from category text (e.g., "Emitter/Behavior/Alpha Behavior")
        const parts = normalizedText.split("/").filter((p) => p.length > 0);

        if (parts.length === 0) return;

        // Build nested structure
        let current = groups;
        parts.forEach((part, index) => {
            if (!current[part]) {
                current[part] = {
                    text: part,
                    collapsed: true,
                    link: null,
                    parentItems: [],
                    childItems: [],
                    children: {},
                };
            }

            // If this is the last part
            if (index === parts.length - 1) {
                if (hasTrailingSlash) {
                    // Trailing slash means these are children items
                    current[part].childItems.push(...category.items);
                } else {
                    // No trailing slash means these are parent-level items (becomes the link)
                    current[part].parentItems.push(...category.items);
                }
            } else {
                // Otherwise, move deeper into the hierarchy
                current = current[part].children;
            }
        });
    });

    // Convert nested object to array structure
    return convertGroupsToArray(groups);
}

/**
 * Recursively converts group object structure to VitePress sidebar array
 */
function convertGroupsToArray(groups) {
    return Object.values(groups).map((group) => {
        const item = {
            text: group.text,
            collapsed: group.collapsed,
        };

        // If there's a single parent item, use it as the link for this group
        if (group.parentItems.length === 1) {
            item.link = group.parentItems[0].link;
            item.items = [...group.childItems];
        } else if (group.parentItems.length > 1) {
            // Multiple parent items - show them all as children
            item.items = [...group.parentItems, ...group.childItems];
        } else {
            // No parent items, just children
            item.items = [...group.childItems];
        }

        // Add nested children groups if they exist
        if (Object.keys(group.children).length > 0) {
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
                        link: "/customization/custom-behavior",
                    },
                    {
                        text: "Custom Particle Data",
                        link: "/customization/custom-particle-data",
                    },
                    {
                        text: "Custom Particle",
                        link: "/customization/custom-particle",
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
        outline: {
            level: [2, 4],
        },
    },
};
