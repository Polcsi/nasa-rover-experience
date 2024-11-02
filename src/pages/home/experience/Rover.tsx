import React from "react";
import useScroll from "@/hooks/useScroll";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";
import config from "@experience/config";

type RoverProps = JSX.IntrinsicElements["group"];

let mixer: THREE.AnimationMixer | null = null;
const Rover = (props: RoverProps) => {
    const { scene, animations } = useGLTF(config.model);
    const groupRef = React.useRef<THREE.Group>(null);

    const [section] = useScroll();

    React.useEffect(() => {
        mixer = new THREE.AnimationMixer(scene);

        const clips = animations;
        const clip = THREE.AnimationClip.findByName(clips, "Prepare");
        const action = mixer.clipAction(clip);

        action.play();
    }, [animations, scene]);

    React.useLayoutEffect(() => {
        switch (section) {
            case 0:
                gsap.to(groupRef.current!.position, {
                    x: config.sections[0].position.x,
                    y: config.sections[0].position.y,
                    z: config.sections[0].position.z,
                    duration: 0.8,
                    ease: "power2.inOut",
                });
                break;
            case 1:
                gsap.to(groupRef.current!.position, {
                    x: config.sections[1].position.x,
                    y: config.sections[1].position.y,
                    z: config.sections[1].position.z,
                    duration: 0.8,
                    ease: "power2.inOut",
                });
                break;
        }
    }, [section]);

    useFrame((_state, delta) => {
        mixer?.update(delta);
    });

    return (
        <group {...props} ref={groupRef}>
            <primitive object={scene} />
        </group>
    );
};

export default Rover;
