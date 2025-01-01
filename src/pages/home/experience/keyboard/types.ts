export type Callback = (pressed: boolean) => void;

export type Controls = "forward" | "backward" | "left" | "right";

export type KeyboardState = {
    [key in Controls]: boolean;
};
