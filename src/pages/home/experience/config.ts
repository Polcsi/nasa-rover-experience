import * as THREE from "three";

const config = {
    model: "/models/curiosity_rover.glb",
    textures: {
        ground: "/textures/baked_ground.jpg",
        terrain: "/textures/baked_terrain.jpg",
    },
    camera: {
        far: 15,
        near: 1.5,
        position: new THREE.Vector3(3, 3, 5),
    },
    sections: [
        {
            index: 0,
            scene: {
                position: new THREE.Vector3(2, 0, 0),
            },
            camera: { position: new THREE.Vector3(3, 3, 5) },
        },
        {
            index: 1,
            scene: {
                position: new THREE.Vector3(0, 0, 0),
            },
            camera: {
                position: new THREE.Vector3(0, 4, 5),
            },
        },
    ],
} as const;

export default config;
