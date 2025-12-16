import { PanelProps } from "../../Types";

export function TexturePanel({ emitter, isOpen }: PanelProps) {
    return (
        <>
            <details open={isOpen}>
                <summary>Texture Panel</summary>
            </details>
        </>
    );
}
