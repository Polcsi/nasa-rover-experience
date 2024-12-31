import React, { ReactElement, createContext, useContext } from "react";
import KeyboardControlsEvent from "@keyboard/KeyboardControlsEvent";
import type { Controls, Callback } from "@keyboard/types";

type ProviderParams = {
    children?: ReactElement[] | ReactElement | undefined;
};

const useContextFunc = () => {
    const sub = (control: Controls, callback: Callback) => {
        KeyboardControlsEvent.getInstace().add(control, callback);
    };

    const unsub = (control: Controls, callback: Callback) => {
        KeyboardControlsEvent.getInstace().remove(control, callback);
    };

    React.useEffect(() => {
        console.log(KeyboardControlsEvent.getInstace());
    }, []);

    return [sub, unsub];
};

type UseKeyboardContextType = ReturnType<typeof useContextFunc>;

const initContextState: UseKeyboardContextType = [() => {}, () => {}];
const KeyboardContext = createContext<UseKeyboardContextType>(initContextState);

const KeyboardContextProvider = ({ children }: ProviderParams) => {
    return <KeyboardContext.Provider value={useContextFunc()}>{children}</KeyboardContext.Provider>;
};

export const useKeyboardContext = () => {
    return useContext(KeyboardContext);
};

export { KeyboardContext, KeyboardContextProvider };
