declare global {
    interface Window {
        fps: number;
        error: false | { message: string };
    }
}

export {};
