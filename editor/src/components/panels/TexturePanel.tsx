import { TextureConfig } from "pixi-particle-system";
import { Texture } from "pixi.js";
import { useState } from "react";
import { PanelProps } from "../../Types";
import { NumberControl } from "../ui/controls/NumberControl";
import { Toggle } from "../ui/inputs/Toggle";

type TextureObjectProps = {
    label: string;
    onRemove: () => void;
    framerate?: number;
    duration?: number;
    loop?: boolean;
};

export function TextureObject({
    label,
    onRemove,
    framerate = -1,
    duration = -1,
    loop = false,
}: TextureObjectProps) {
    return (
        <>
            <details open>
                <summary>{label}</summary>

                <div
                    style={{
                        display: "flex",
                        alignContent: "center",
                        alignItems: "start",
                    }}
                >
                    <img src="https://placehold.co/64x64" alt="" />
                    <div
                        style={{
                            paddingLeft: "10px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "end",
                        }}
                    >
                        <NumberControl
                            label="Framerate"
                            defaultValue={framerate}
                        />
                        <NumberControl
                            label="Duration"
                            defaultValue={duration}
                        />
                        <Toggle label="Loop" defaultValue={loop} />
                        <button
                            style={{ width: "50%" }}
                            onClick={() => onRemove()}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </details>
        </>
    );
}

export function TexturePanel({ emitter, isOpen }: PanelProps) {
    const [textureConfigs, setTextureConfigs] = useState<TextureConfig[]>([
        { textures: [Texture.WHITE] },
    ]);

    return (
        <>
            <details open={isOpen}>
                <summary>Texture Panel</summary>

                <hr />

                {textureConfigs.map((config, index) => (
                    <>
                        <TextureObject
                            key={index}
                            label={`Texture Object ${index + 1}`}
                            onRemove={() => {
                                const newConfigs = [...textureConfigs];
                                newConfigs.splice(index, 1);
                                setTextureConfigs(newConfigs);
                            }}
                        />

                        <hr />
                    </>
                ))}

                <button
                    onClick={() => {
                        setTextureConfigs([
                            ...textureConfigs,
                            { textures: [Texture.WHITE] },
                        ]);
                    }}
                >
                    Add Texture Config
                </button>
            </details>
        </>
    );
}
