import React, { ReactElement, createContext, useContext } from "react";
import { type Marker } from "@/pages/home/experience/marker/types";

type ProviderParams = {
    children?: ReactElement[] | ReactElement | undefined;
};

const DEFAULT_MARKER: Marker = {
    id: 0,
    title: "",
    description: "",
} as const;

const useContextFunc = () => {
    const [activeMarker, setActiveMarker] = React.useState<Marker>(DEFAULT_MARKER);

    const resetMarker = () => {
        setActiveMarker(DEFAULT_MARKER);
    };

    return { activeMarker, setActiveMarker, resetMarker };
};

type UseMarkerContextType = ReturnType<typeof useContextFunc>;

const initContextState: UseMarkerContextType = {
    activeMarker: DEFAULT_MARKER,
    setActiveMarker: () => {},
    resetMarker: () => {},
};

const MarkerContext = createContext<UseMarkerContextType>(initContextState);

const MarkerContextProvider = ({ children }: ProviderParams) => {
    return <MarkerContext.Provider value={useContextFunc()}>{children}</MarkerContext.Provider>;
};

export const useMarkerContext = () => {
    return useContext(MarkerContext);
};

export { MarkerContext, MarkerContextProvider };
