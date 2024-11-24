import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import config from "@experience/config";
import type { CuriosityRoverGLTF } from "@experience/scene/types";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

type TerrainProps = JSX.IntrinsicElements["mesh"];

const Terrain = (props: TerrainProps) => {
    const { nodes } = useGLTF(config.model) as CuriosityRoverGLTF;

    // Terrain Texture
    const bakedTerrainTexture = useLoader(THREE.TextureLoader, config.textures.terrain);

    bakedTerrainTexture.flipY = false;
    bakedTerrainTexture.colorSpace = THREE.SRGBColorSpace;

    const bakedTerrainMaterial = new THREE.MeshBasicMaterial({
        map: bakedTerrainTexture,
    });

    return (
        <RigidBody key={props.visible ? 1 : 0} type="fixed" colliders="cuboid">
            <mesh
                name="Terrain"
                material={bakedTerrainMaterial}
                geometry={nodes.Terrain.geometry}
                position={[0, -0.0293, 0]}
                {...props}
            />
        </RigidBody>
    );
};

export default Terrain;
