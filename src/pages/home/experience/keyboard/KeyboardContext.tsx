import { ReactElement, createContext, useContext } from "react";
import KeyboardControlsEvent from "@keyboard/KeyboardControlsEvent";
import type { Controls, Callback, KeyboardState } from "@keyboard/types";

type ProviderParams = {
    children?: ReactElement[] | ReactElement | undefined;
};

const useContextFunc = (): [
    (control: Controls, callback: Callback) => void,
    (control: Controls, callback: Callback) => void,
    () => KeyboardState,
] => {
    const sub = (control: Controls, callback: Callback) => {
        KeyboardControlsEvent.getInstace().add(control, callback);
    };

    const unsub = (control: Controls, callback: Callback) => {
        KeyboardControlsEvent.getInstace().remove(control, callback);
    };

    const getKeys = () => {
        return KeyboardControlsEvent.getInstace().keys;
    };

    return [sub, unsub, getKeys];
};

type UseKeyboardContextType = ReturnType<typeof useContextFunc>;

const initContextState: UseKeyboardContextType = [
    () => {},
    () => {},
    () => ({ forward: false, backward: false, left: false, right: false }),
];
const KeyboardContext = createContext<UseKeyboardContextType>(initContextState);

const KeyboardContextProvider = ({ children }: ProviderParams) => {
    return <KeyboardContext.Provider value={useContextFunc()}>{children}</KeyboardContext.Provider>;
};

export const useKeyboardContext = () => {
    return useContext(KeyboardContext);
};

export { KeyboardContext, KeyboardContextProvider };
