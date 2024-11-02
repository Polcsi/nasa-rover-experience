import React from "react";
import useScroll from "@/hooks/useScroll";
import { CameraControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

const Controls = () => {
    const { gl } = useThree();
    const [section] = useScroll();

    const cameracontrolsRef = React.useRef<CameraControls>(null);

    const isSecondSection = React.useMemo(() => section === 1, [section]);

    React.useEffect(() => {
        switch (section) {
            case 0:
                if (cameracontrolsRef.current) {
                    cameracontrolsRef.current?.setPosition(3, 3, 5, true).then(() => {
                        cameracontrolsRef.current.enabled = false;
                    });
                }
                gl.domElement.classList.remove("grab");
                break;
            case 1:
                if (cameracontrolsRef.current) {
                    cameracontrolsRef.current.enabled = true;
                    cameracontrolsRef.current?.setPosition(0, 4, 5, true);
                }
                gl.domElement.classList.add("grab");
                break;
            case 2:
                gl.domElement.classList.remove("grab");
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
                middle: 0,
                wheel: 0, // 16
                right: 0, // 8 dolly
            }}
            onStart={handleStart}
            onEnd={handleEnd}
            maxPolarAngle={Math.PI / 2}
        />
    );
};

export default Controls;
