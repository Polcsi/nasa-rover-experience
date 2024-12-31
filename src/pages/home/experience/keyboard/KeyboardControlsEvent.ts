import type { Controls, Callback } from "@keyboard/types";

class KeyboardControlsEvent {
    private static _instance: KeyboardControlsEvent;
    private readonly _keys: Map<Controls, Callback[]> = new Map();
    private _tempFunctions: Map<string, ((event: KeyboardEvent) => void) | null> = new Map();

    constructor() {
        if (KeyboardControlsEvent._instance) {
            return KeyboardControlsEvent._instance;
        }

        KeyboardControlsEvent._instance = this;
    }

    public getInstace(): KeyboardControlsEvent {
        return KeyboardControlsEvent._instance;
    }

    public subscribe(): void {
        this._tempFunctions.set("keydown", (event: KeyboardEvent) => {
            const key = event.key;

            switch (key) {
                case "w":
                    this._keys.get("forward")?.forEach(cb => cb(true));
                    break;
                case "a":
                    this._keys.get("left")?.forEach(cb => cb(true));
                    break;
                case "s":
                    this._keys.get("backward")?.forEach(cb => cb(true));
                    break;
                case "d":
                    this._keys.get("right")?.forEach(cb => cb(true));
                    break;
            }
        });

        this._tempFunctions.set("keyup", (event: KeyboardEvent) => {
            const key = event.key;

            switch (key) {
                case "w":
                    this._keys.get("forward")?.forEach(cb => cb(false));
                    break;
                case "a":
                    this._keys.get("left")?.forEach(cb => cb(false));
                    break;
                case "s":
                    this._keys.get("backward")?.forEach(cb => cb(false));
                    break;
                case "d":
                    this._keys.get("right")?.forEach(cb => cb(false));
                    break;
            }
        });

        window.addEventListener("keydown", this._tempFunctions.get("keydown") as EventListener);
        window.addEventListener("keyup", this._tempFunctions.get("keyup") as EventListener);
    }

    public unsubscribe(): void {
        if (this._tempFunctions.size === 0) {
            return;
        }

        if (this._tempFunctions.has("keydown")) {
            window.removeEventListener("keydown", this._tempFunctions.get("keydown") as EventListener);
        }

        if (this._tempFunctions.has("keyup")) {
            window.removeEventListener("keyup", this._tempFunctions.get("keyup") as EventListener);
        }

        this._tempFunctions.clear();
    }

    public add(control: Controls, callback: Callback): void {
        this.unsubscribe();

        if (!this._keys.has(control)) {
            this._keys.set(control, []);
        }

        if (!this._keys.get(control)?.find(cb => cb === callback)) {
            this._keys.get(control)?.push(callback);
        }

        this.subscribe();
    }

    public remove(control: Controls, callback: Callback): void {
        this.unsubscribe();

        const callbacks = this._keys.get(control);

        if (!callbacks) {
            return;
        }

        this._keys.set(
            control,
            callbacks?.filter(cb => cb !== callback),
        );
    }
}

const instance = new KeyboardControlsEvent();
Object.freeze(instance);

export default instance;
