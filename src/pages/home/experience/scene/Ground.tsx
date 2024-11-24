import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import config from "@experience/config";
import type { CuriosityRoverGLTF } from "@experience/scene/types";
import { useGLTF } from "@react-three/drei";

type GroundProps = JSX.IntrinsicElements["mesh"];

const Ground = (props: GroundProps) => {
    const { nodes } = useGLTF(config.model) as CuriosityRoverGLTF;
    // Ground Texture
    const bakedTexture = useLoader(THREE.TextureLoader, config.textures.ground);

    bakedTexture.flipY = false;
    bakedTexture.colorSpace = THREE.SRGBColorSpace;

    const bakedGroundMaterial = new THREE.MeshBasicMaterial({
        map: bakedTexture,
    });

    return (
        <mesh
            name="Ground"
            geometry={nodes.Ground.geometry}
            position={[0, -0.2287, 0]}
            material={bakedGroundMaterial}
            {...props}
        />
    );
};

export default Ground;
