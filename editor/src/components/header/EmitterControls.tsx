import {
    ArrowDownTrayIcon,
    PauseIcon,
    PlayIcon,
    StopIcon,
} from "@heroicons/react/16/solid";
import { useState } from "react";
import { LoadConfigModal } from "../modal/LoadConfigModal";

/**
 * Controls for the particle emitter (play, pause, stop, load, save).
 * @returns JSX.Element Emitter controls component.
 */
export function EmitterControls(): JSX.Element {
    const emitter = window.particleEmitter;

    const [paused, setPaused] = useState(false);
    const [stopped, setStopped] = useState(false);

    const [showLoadModal, setShowLoadModal] = useState(false);

    return (
        <>
            {showLoadModal && (
                <LoadConfigModal
                    onClose={() => {
                        setShowLoadModal(false);
                    }}
                />
            )}

            <ul>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                    }}
                >
                    {(paused || stopped) && (
                        <button
                            data-tooltip="Plays the particle emitter."
                            data-placement="right"
                            onClick={() => {
                                if (paused) {
                                    emitter.resume();
                                    setPaused(false);
                                }

                                if (stopped) {
                                    emitter.play();
                                    setStopped(false);
                                }
                            }}
                        >
                            <PlayIcon
                                style={{
                                    width: "auto",
                                    height: "24px",
                                }}
                            />
                        </button>
                    )}

                    {!paused && !stopped && (
                        <button
                            data-tooltip="Pauses the particle emitter."
                            data-placement="right"
                            onClick={() => {
                                emitter.pause();
                                setPaused(true);
                            }}
                        >
                            <PauseIcon
                                style={{
                                    width: "auto",
                                    height: "24px",
                                }}
                            />
                        </button>
                    )}

                    <button
                        data-tooltip="Stops the particle emitter - double tap to stop instantly."
                        data-placement="right"
                        onClick={() => {
                            if (emitter.isEmitting) {
                                emitter.stop();
                            } else {
                                emitter.stop(true);
                            }

                            setStopped(true);
                        }}
                    >
                        <StopIcon style={{ width: "auto", height: "24px" }} />
                    </button>
                </div>

                <li>
                    <div className="divider"></div>
                </li>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                    }}
                >
                    <button
                        data-tooltip="Download current emitter configuration as a JSON file."
                        data-placement="right"
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
                        <ArrowDownTrayIcon
                            style={{ width: "auto", height: "24px" }}
                        />
                    </button>

                    <button
                        data-tooltip="Load configuration from preset or JSON file."
                        data-placement="right"
                        onClick={() => {
                            setShowLoadModal(true);
                        }}
                    >
                        Load Config
                    </button>
                </div>
            </ul>
        </>
    );
}
