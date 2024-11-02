import useDebug from "@/hooks/useDebug";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import Controls from "@experience/Controls";
import Helpers from "@experience/Helpers";
import Rover from "@experience/Rover";
import React from "react";
import Camera from "@experience/Camera";
import { Environment } from "@react-three/drei";

const Experience = () => {
    const { isDebug } = useDebug();

    return (
        <div className="webgl">
            <Leva hidden={!isDebug} collapsed />

            <Canvas
                dpr={[1, 2]}
                frameloop="always"
                flat
                gl={{
                    antialias: true,
                }}
            >
                <Controls />
                <Helpers />
                <Camera />

                <Environment preset="city" />
                <React.Suspense fallback={null}>
                    <Rover position={[2, 0, 0]} rotation={[0, -0.2, 0]} />
                </React.Suspense>

                <ambientLight />
                <pointLight position={[10, 10, 10]} />
            </Canvas>
        </div>
    );
};

export default Experience;
