import * as THREE from "three";

const config = {
    model: "/models/curiosity_rover.glb",
    textures: {
        ground: "/textures/baked_ground.jpg",
    },
    sections: [
        {
            index: 0,
            position: new THREE.Vector3(2, 0, 0),
        },
        {
            index: 1,
            position: new THREE.Vector3(0, 0, 0),
        },
    ],
} as const;

export default config;
