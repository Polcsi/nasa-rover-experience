import React from "react";
import useScroll from "@/hooks/useScrollThree";
import { CameraControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import useDebug from "@/hooks/useDebug";
import config from "./config";

const Controls = () => {
    const { gl } = useThree();
    const [section] = useScroll();
    const { isDebug } = useDebug();

    const cameracontrolsRef = React.useRef<CameraControls>(null);

    React.useEffect(() => {
        switch (section) {
            case 0:
                if (cameracontrolsRef.current) {
                    cameracontrolsRef.current
                        ?.setPosition(
                            config.sections[0].camera.position.x,
                            config.sections[0].camera.position.y,
                            config.sections[0].camera.position.z,
                            true,
                        )
                        .then(() => {
                            cameracontrolsRef.current.enabled = false;
                        });
                }
                gl.domElement.classList.remove("grab");
                break;
            case 1:
                if (cameracontrolsRef.current) {
                    cameracontrolsRef.current.enabled = true;
                    cameracontrolsRef.current?.setPosition(
                        config.sections[1].camera.position.x,
                        config.sections[1].camera.position.y,
                        config.sections[1].camera.position.z,
                        true,
                    );
                }
                gl.domElement.classList.add("grab");
                break;
            case 2:
                gl.domElement.classList.add("grab");
                break;
        }
    }, [section]);

    const handleStart = () => {
        gl.domElement.classList.add("grabbing");
    };

    const handleEnd = () => {
        gl.domElement.classList.remove("grabbing");
    };

    return (
        <CameraControls
            ref={cameracontrolsRef}
            makeDefault
            enabled={false}
            mouseButtons={{
                left: 1,
                middle: isDebug ? 8 : 0, // dolly,
                wheel: 0, // 16
                right: isDebug ? 2 : 0, // pan
            }}
            onStart={handleStart}
            onEnd={handleEnd}
            azimuthRotateSpeed={0.3}
            maxPolarAngle={Math.PI / 2.4}
        />
    );
};

export default Controls;
