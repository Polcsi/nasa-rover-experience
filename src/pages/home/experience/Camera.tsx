import { PerspectiveCamera } from "@react-three/drei";

const Camera = () => {
    return <PerspectiveCamera position={[2, 3, 5]} makeDefault />;
};

export default Camera;
