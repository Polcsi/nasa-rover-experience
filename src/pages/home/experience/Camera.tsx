import { PerspectiveCamera } from "@react-three/drei";
import { useControls } from "leva";
import config from "@experience/config";

const Camera = () => {
    const { far, near } = useControls(
        "Camera",
        {
            far: {
                value: config.camera.far,
                min: 0,
                step: 1,
                max: 100,
            },
            near: {
                value: config.camera.near,
                min: -10,
                max: 10,
                step: 0.001,
            },
        },
        {
            collapsed: true,
        },
    );
    return <PerspectiveCamera position={config.camera.position} makeDefault far={far} near={near} />;
};

export default Camera;
