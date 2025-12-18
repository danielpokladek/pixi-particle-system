import { Emitter } from "pixi-particle-system";
import { useState } from "react";
import { AlphaPanel } from "./panels/AlphaPanel";
import { ColorPanel } from "./panels/ColorPanel";
import { EmitterPanel } from "./panels/EmitterPanel";
import { MovementPanel } from "./panels/MovementPanel";
import { RotationPanel } from "./panels/RotationPanel";
import { ScalePanel } from "./panels/ScalePanel";
import { SpawnPanel } from "./panels/SpawnPanel";

type Props = {
    emitter: Emitter;
};

export default function Sidebar({ emitter }: Props) {
    const [paused, setPaused] = useState(emitter.isPaused);

    return (
        <aside className="sidebar">
            {emitter && (
                <>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            paddingBottom: "1em",
                            gap: "10px",
                        }}
                    >
                        <button
                            style={{ flex: 1 }}
                            onClick={() => {
                                const configObject = emitter.getConfig();
                                const jsonConfig = JSON.stringify(
                                    configObject,
                                    null,
                                    4,
                                );
                                const blob = new Blob([jsonConfig], {
                                    type: "application/json",
                                });
                                const url = URL.createObjectURL(blob);

                                const a = document.createElement("a");
                                a.href = url;
                                a.download = "emitter-config.json";
                                a.click();
                            }}
                        >
                            Download Current Config
                        </button>
                        <button disabled style={{ flex: 1 }}>
                            Upload Custom Config
                        </button>
                        <button disabled style={{ flex: 1 }}>
                            Browse Examples
                        </button>
                    </div>

                    <hr />

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            paddingBottom: "1em",
                            gap: "10px",
                        }}
                    >
                        <button
                            style={{ flex: 1 }}
                            onClick={() => {
                                emitter.play();
                            }}
                        >
                            Play
                        </button>
                        {!paused && (
                            <button
                                style={{ flex: 1 }}
                                onClick={() => {
                                    emitter.pause();
                                    setPaused(true);
                                }}
                            >
                                Pause
                            </button>
                        )}
                        {paused && (
                            <button
                                style={{ flex: 1 }}
                                onClick={() => {
                                    emitter.resume();
                                    setPaused(false);
                                }}
                            >
                                Resume
                            </button>
                        )}
                        <button
                            style={{ flex: 1 }}
                            onClick={() => {
                                emitter.stop(!emitter.isEmitting);
                            }}
                        >
                            Stop
                        </button>
                    </div>
                </>
            )}

            {emitter && (
                <>
                    <EmitterPanel emitter={emitter} isOpen={true} />
                    <SpawnPanel emitter={emitter} isOpen={false} />
                    <AlphaPanel emitter={emitter} isOpen={false} />
                    <ColorPanel emitter={emitter} isOpen={false} />
                    <MovementPanel emitter={emitter} isOpen={false} />
                    <RotationPanel emitter={emitter} isOpen={false} />
                    <ScalePanel emitter={emitter} isOpen={false} />
                    {/* <TexturePanel emitter={emitter} isOpen={false} /> */}
                </>
            )}
        </aside>
    );
}
