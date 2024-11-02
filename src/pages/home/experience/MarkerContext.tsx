import React, { ReactElement, createContext, useContext } from "react";
import { type Marker } from "@experience/Marker";

type ProviderParams = {
    children?: ReactElement[] | ReactElement | undefined;
};

const useContextFunc = () => {
    const [activeMarker, setActiveMarker] = React.useState<Marker>({
        id: 0,
        title: "",
        description: "",
    });

    return { activeMarker, setActiveMarker };
};

type UseMarkerContextType = ReturnType<typeof useContextFunc>;

const initContextState: UseMarkerContextType = {
    activeMarker: {
        id: 0,
        title: "",
        description: "",
    },
    setActiveMarker: () => {},
};

const MarkerContext = createContext<UseMarkerContextType>(initContextState);

const MarkerContextProvider = ({ children }: ProviderParams) => {
    return <MarkerContext.Provider value={useContextFunc()}>{children}</MarkerContext.Provider>;
};

export const useMarkerContext = () => {
    return useContext(MarkerContext);
};

export { MarkerContext, MarkerContextProvider };
