import { EmitterPanel } from "./panels/EmitterPanel";
import { SpawnPanel } from "./panels/SpawnPanel";

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <h2>Controls</h2>

            <EmitterPanel />
            <SpawnPanel />
        </aside>
    );
}
