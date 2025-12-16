import { Emitter } from "pixi-particle-system";
import { AlphaPanel } from "./panels/AlphaPanel";
import { ColorPanel } from "./panels/ColorPanel";
import { EmitterPanel } from "./panels/EmitterPanel";
import { MovementPanel } from "./panels/MovementPanel";
import { RotationPanel } from "./panels/RotationPanel";
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
                    <EmitterPanel emitter={emitter} isOpen={false} />
                    <SpawnPanel emitter={emitter} isOpen={false} />
                    <AlphaPanel emitter={emitter} isOpen={false} />
                    <ColorPanel emitter={emitter} isOpen={false} />
                    <MovementPanel emitter={emitter} isOpen={false} />
                    <RotationPanel emitter={emitter} isOpen={true} />
                </>
            )}
        </aside>
    );
}
