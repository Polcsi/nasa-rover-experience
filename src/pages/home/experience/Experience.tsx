import React from "react";
import useDebug from "@/hooks/useDebug";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import Controls from "@experience/Controls";
import Helpers from "@experience/Helpers";
import Camera from "@experience/Camera";
import { Environment } from "@react-three/drei";
import config from "@experience/config";
import Scene from "@/pages/home/experience/scene/Scene";

const Experience = () => {
    const { isDebug } = useDebug();

    return (
        <>
            <Leva hidden={!isDebug} collapsed />
            <div className="webgl">
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
                    <ambientLight />

                    <React.Suspense fallback={null}>
                        <Scene position={config.sections[0].scene.position} />
                    </React.Suspense>
                </Canvas>
            </div>
        </>
    );
};

export default Experience;
