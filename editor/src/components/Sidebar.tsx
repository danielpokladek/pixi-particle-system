import { AlphaPanel } from "./panels/AlphaPanel";
import { ColorPanel } from "./panels/ColorPanel";
import { EmitterPanel } from "./panels/EmitterPanel";
import { MovementPanel } from "./panels/MovementPanel";
import { RotationPanel } from "./panels/RotationPanel";
import { ScalePanel } from "./panels/ScalePanel";
import { SpawnPanel } from "./panels/SpawnPanel";

/**
 * Sidebar component containing various emitter controls and panels.
 */
export default function Sidebar(): JSX.Element {
    const emitter = window.particleEmitter;

    return (
        <aside className="sidebar">
            <h3>Behavior Controls</h3>

            {emitter && (
                <>
                    <EmitterPanel isOpen={true} />
                    <SpawnPanel isOpen={false} />
                    <AlphaPanel isOpen={false} />
                    <ColorPanel isOpen={false} />
                    <MovementPanel isOpen={false} />
                    <RotationPanel isOpen={false} />
                    <ScalePanel isOpen={false} />
                    {/* // TODO: Add back once ready. */}
                    {/* <TexturePanel isOpen={false} /> */}
                </>
            )}
        </aside>
    );
}
