import { PerspectiveCamera } from "@react-three/drei";

const Camera = () => {
    return <PerspectiveCamera position={[3, 3, 5]} makeDefault far={15} />;
};

export default Camera;
