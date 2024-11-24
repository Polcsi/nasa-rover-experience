import React from "react";
import { Html } from "@react-three/drei";
import { useMarkerContext } from "@/pages/home/experience/marker/MarkerContext";
import type { Marker } from "@experience/marker/types";

type MarkerProps = {
    children: React.ReactNode;
    hidden?: boolean;
} & Marker;

const Marker = (props: MarkerProps) => {
    const { children, hidden = false, ...markerProps } = props;
    const { activeMarker, setActiveMarker } = useMarkerContext();

    const handleClick = () => {
        setActiveMarker(markerProps);
    };

    return (
        <Html center visible={!hidden}>
            <div
                style={{
                    display: hidden ? "none" : "flex",
                }}
                className={`${markerProps.id === activeMarker?.id ? "bg-3 text-2" : "bg-2 text-4"} size-8 flex justify-center items-center shadow-sm cursor-pointer hover:opacity-90 transition-all ease-in-out duration-100`}
                onClick={handleClick}
            >
                {children}
            </div>
        </Html>
    );
};

export default Marker;
