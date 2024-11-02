import { CameraControls } from "@react-three/drei";

const Controls = () => {
    return (
        <CameraControls
            makeDefault
            enabled={false}
            mouseButtons={{
                left: 1,
                middle: 0,
                wheel: 0, // 16
                right: 8,
            }}
        />
    );
};

export default Controls;
