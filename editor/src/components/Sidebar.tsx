import { Emitter } from "pixi-particle-system";
import { AlphaPanel } from "./panels/AlphaPanel";
import { ColorPanel } from "./panels/ColorBehavior";
import { EmitterPanel } from "./panels/EmitterPanel";
import { MovementPanel } from "./panels/MovementPanel";
import { SpawnPanel } from "./panels/SpawnPanel";

type Props = {
    emitter: Emitter | null;
};

export default function Sidebar({ emitter }: Props) {
    return (
        <aside className="sidebar">
            <h2>Controls</h2>

            {emitter && (
                <>
                    <EmitterPanel emitter={emitter} />
                    <SpawnPanel emitter={emitter} />
                    <AlphaPanel />
                    <ColorPanel />
                    <MovementPanel emitter={emitter} isOpen={true} />
                </>
            )}
        </aside>
    );
}
