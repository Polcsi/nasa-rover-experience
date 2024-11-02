import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";

type RoverProps = JSX.IntrinsicElements["group"];

let mixer: THREE.AnimationMixer | null = null;
const Rover = (props: RoverProps) => {
    const { scene, animations } = useGLTF("/models/curiosity_rover.glb");
    console.log(animations);

    React.useEffect(() => {
        mixer = new THREE.AnimationMixer(scene);

        const clips = animations;
        const clip = THREE.AnimationClip.findByName(clips, "Prepare");
        const action = mixer.clipAction(clip);

        action.play();
    }, [animations, scene]);

    useFrame((_state, delta) => {
        mixer?.update(delta);
    });

    return (
        <group {...props}>
            <primitive object={scene} />
        </group>
    );
};

export default Rover;
