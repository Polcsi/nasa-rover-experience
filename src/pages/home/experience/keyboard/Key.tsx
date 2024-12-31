import React from "react";
import { twMerge } from "tailwind-merge";
import { useKeyboardContext } from "@keyboard/KeyboardContext";
import type { Controls } from "@keyboard/types";

type KeyProps = {
    control: Controls;
    button: "w" | "a" | "s" | "d";
} & React.HTMLAttributes<HTMLButtonElement>;

const Key = ({ control, button, ...divProps }: KeyProps) => {
    const [sub, unsub] = useKeyboardContext();
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    React.useEffect(() => {
        const activateKey = (pressed: boolean) => {
            if (buttonRef.current) {
                if (pressed) {
                    buttonRef.current.classList.add("active-key");
                } else {
                    buttonRef.current.classList.remove("active-key");
                }
            }
        };

        sub(control, activateKey);

        return () => {
            unsub(control, activateKey);
        };
    }, []);

    return (
        <button type="button" ref={buttonRef} {...divProps} className={twMerge("key", divProps.className)}>
            {button}
        </button>
    );
};

export default Key;
