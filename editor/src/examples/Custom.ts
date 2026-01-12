import { EmitterConfig } from "pixi-particle-system";
import { Texture } from "pixi.js";

/**
 * Loads custom configuration from file.
 * @returns Emitter config or null when there was an error.
 */
export async function getConfigFromFile(): Promise<EmitterConfig | null> {
    // TODO: Something is causing particles to be invisible when loaded from file.

    const file = await new Promise<File | null>((resolve) => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "application/json,.json";

        input.addEventListener(
            "change",
            () => resolve(input.files?.[0] ?? null),
            { once: true },
        );

        input.click();
    });

    if (file) {
        const rawText = await file.text();
        const parsedConfig = JSON.parse(rawText) as EmitterConfig;

        parsedConfig.textureBehavior = {
            mode: "static",
            textureConfigs: [{ textures: [Texture.WHITE] }],
        };

        return parsedConfig;
    }

    return null;
}
