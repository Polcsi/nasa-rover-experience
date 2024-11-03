import * as THREE from "three";
import React, { useRef } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import config from "@experience/config";
import useScroll from "@/hooks/useScrollThree";
import gsap from "gsap";
import Marker from "./Marker";
import { useLoader } from "@react-three/fiber";

type GLTFResult = GLTF & {
    nodes: {
        antenna_HG_01_0: THREE.Mesh;
        antenna_HG_03_0: THREE.Mesh;
        arm_01001_0: THREE.Mesh;
        arm_01001_1: THREE.Mesh;
        arm_02001_0: THREE.Mesh;
        arm_02001_1: THREE.Mesh;
        arm_02001_2: THREE.Mesh;
        arm_02001_3: THREE.Mesh;
        arm_03001_0: THREE.Mesh;
        arm_03001_1: THREE.Mesh;
        arm_03001_2: THREE.Mesh;
        arm_03001_3: THREE.Mesh;
        arm_04001_0: THREE.Mesh;
        arm_04001_1: THREE.Mesh;
        APXS_0: THREE.Mesh;
        arm_05_head001_0: THREE.Mesh;
        bit_01001_0: THREE.Mesh;
        CHIMERA_0: THREE.Mesh;
        CHIMERA_1: THREE.Mesh;
        Drill_0: THREE.Mesh;
        Drill_1: THREE.Mesh;
        Dust_Removal_Tool_0: THREE.Mesh;
        MAHLI_0: THREE.Mesh;
        MAHLI_LED_01_0: THREE.Mesh;
        MAHLI_LED_02_0: THREE.Mesh;
        MAHLI_LED_03_0: THREE.Mesh;
        MAHLI_LED_04_0: THREE.Mesh;
        MAHLI_lens_cover_0: THREE.Mesh;
        MAHLI_cal_target_0: THREE.Mesh;
        bit_02_0: THREE.Mesh;
        bit_03_0: THREE.Mesh;
        body_0: THREE.Mesh;
        body_1: THREE.Mesh;
        body_2: THREE.Mesh;
        body_3: THREE.Mesh;
        body_4: THREE.Mesh;
        body_5: THREE.Mesh;
        lens_covers_front_0: THREE.Mesh;
        lens_covers_rear_0: THREE.Mesh;
        mast_01000_0: THREE.Mesh;
        mast_01001_0: THREE.Mesh;
        mast_02001_0: THREE.Mesh;
        ChemCam_0: THREE.Mesh;
        mast_03001_0: THREE.Mesh;
        MastCam_0: THREE.Mesh;
        NavCam_0: THREE.Mesh;
        suspension_arm_B2_L_0: THREE.Mesh;
        suspension_arm_B2_L_1: THREE.Mesh;
        suspension_steer_B_L_0: THREE.Mesh;
        suspension_steer_B_L_1: THREE.Mesh;
        wheel_03_L_0: THREE.Mesh;
        wheel_02_L_0: THREE.Mesh;
        suspension_arm_B_L_0: THREE.Mesh;
        suspension_arm_B_L_1: THREE.Mesh;
        suspension_steer_F_L_0: THREE.Mesh;
        suspension_steer_F_L_1: THREE.Mesh;
        wheel_01_L_0: THREE.Mesh;
        suspension_arm_F_L_0: THREE.Mesh;
        suspension_arm_F_L_1: THREE.Mesh;
        suspension_axel_L2_0: THREE.Mesh;
        suspension_axel_L_0: THREE.Mesh;
        suspension_rod_L_0: THREE.Mesh;
        suspension_arm_B2_R_0: THREE.Mesh;
        suspension_arm_B2_R_1: THREE.Mesh;
        suspension_steer_B_R_0: THREE.Mesh;
        suspension_steer_B_R_1: THREE.Mesh;
        wheel_03_R_0: THREE.Mesh;
        wheel_02_R_0: THREE.Mesh;
        suspension_arm_B_R_0: THREE.Mesh;
        suspension_arm_B_R_1: THREE.Mesh;
        suspension_steer_F_R_0: THREE.Mesh;
        suspension_steer_F_R_1: THREE.Mesh;
        wheel_01_R_0: THREE.Mesh;
        suspension_arm_F_R_0: THREE.Mesh;
        suspension_arm_F_R_1: THREE.Mesh;
        suspension_axel_R2_0: THREE.Mesh;
        suspension_axel_R_0: THREE.Mesh;
        suspension_rod_R_0: THREE.Mesh;
        suspension_xmember_0: THREE.Mesh;
        suspension_xmember_1: THREE.Mesh;
        antenna_LG_0: THREE.Mesh;
        antenna_UHF_0: THREE.Mesh;
        body001_0: THREE.Mesh;
        Chassis_0: THREE.Mesh;
        Chassis_1: THREE.Mesh;
        Chassis_2: THREE.Mesh;
        Chassis_3: THREE.Mesh;
        CheMin_0: THREE.Mesh;
        cover_01_0: THREE.Mesh;
        cover_02_0: THREE.Mesh;
        cover_03_0: THREE.Mesh;
        DAN_L_0: THREE.Mesh;
        DAN_R_0: THREE.Mesh;
        ["HazCam_-_front_0"]: THREE.Mesh;
        ["HazCam_-_rear_0"]: THREE.Mesh;
        MARDI001_0: THREE.Mesh;
        RAD_0: THREE.Mesh;
        radiators_0: THREE.Mesh;
        REMS_0: THREE.Mesh;
        RTG_0: THREE.Mesh;
        SAM_0: THREE.Mesh;
        sundial_0: THREE.Mesh;
        Ground: THREE.Mesh;
    };
    materials: {
        ["tex_02.004"]: THREE.MeshStandardMaterial;
        ["tex_03.008"]: THREE.MeshStandardMaterial;
        ["tex_01.008"]: THREE.MeshStandardMaterial;
        ["tex_04.004"]: THREE.MeshStandardMaterial;
        ["tex_05.004"]: THREE.MeshStandardMaterial;
        ["white_LED.004"]: THREE.MeshStandardMaterial;
        ["tex_01.009"]: THREE.MeshStandardMaterial;
        ["parts_AO.004"]: THREE.MeshStandardMaterial;
        ["tex_03_n.004"]: THREE.MeshStandardMaterial;
        ["tex_03.009"]: THREE.MeshStandardMaterial;
    };
};

type ActionName = "Take 01" | "Prepare";
type GLTFActions = Record<ActionName, THREE.AnimationAction>;

const Model = (props: JSX.IntrinsicElements["group"]) => {
    const groupRef = useRef<THREE.Group>(null);
    const { nodes, materials, animations } = useGLTF(config.model) as GLTFResult;

    /* 
        Textures
    */
    const bakedTexture = useLoader(THREE.TextureLoader, config.textures.ground);

    bakedTexture.flipY = false;
    bakedTexture.colorSpace = THREE.SRGBColorSpace;

    const bakedGroundMaterial = new THREE.MeshBasicMaterial({
        map: bakedTexture,
    });

    /* 
        End Textures
    */

    // const { ref, actions, names } = useAnimations(animations);
    const { actions, names } = useAnimations<GLTFActions>(animations, groupRef);

    const [section] = useScroll();

    const isSecondSection = React.useMemo(() => section === 1, [section]);

    React.useEffect(() => {
        actions[names[1]].play();

        return () => {
            actions[names[1]]?.fadeOut(0.5);
        };
    }, [actions, names]);

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

    return (
        <group ref={groupRef} {...props}>
            <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} userData={{ name: "Sketchfab_model" }}>
                <group name="Root" userData={{ name: "Root" }}>
                    <group name="_root_p" userData={{ name: "_root_p" }}>
                        <group name="body" position={[0, -0.055, 0.8864]} userData={{ name: "body" }}>
                            <group
                                name="antenna_HG_01"
                                position={[0.475, 0.5145, 0.3443]}
                                userData={{ name: "antenna_HG_01" }}
                            >
                                <Marker
                                    id={3}
                                    title="X-band Earth Link"
                                    description="Transmitting data directly to and from Earth. Telecommunication included a small deep space transponder on the descent stage and a solid-state power amplifier on the rover for X-band."
                                    hidden={!isSecondSection}
                                >
                                    3
                                </Marker>
                                <mesh
                                    name="antenna_HG_01_0"
                                    geometry={nodes.antenna_HG_01_0.geometry}
                                    material={materials["tex_02.004"]}
                                    userData={{ name: "antenna_HG_01_0" }}
                                />
                                <group
                                    name="antenna_HG_02_p"
                                    position={[0.0364, 0.0784, 0.1332]}
                                    rotation={[0, 0, -0.4363]}
                                    userData={{ name: "antenna_HG_02_p" }}
                                >
                                    <group
                                        name="antenna_HG_03"
                                        position={[-0.3301, -0.5021, -0.1352]}
                                        rotation={[0, 0, -2.7053]}
                                        userData={{ name: "antenna_HG_03" }}
                                    >
                                        <mesh
                                            name="antenna_HG_03_0"
                                            geometry={nodes.antenna_HG_03_0.geometry}
                                            material={materials["tex_02.004"]}
                                            userData={{ name: "antenna_HG_03_0" }}
                                        />
                                    </group>
                                </group>
                            </group>
                            <group
                                // ref={ref}
                                name="arm_01001"
                                position={[0.4515, -1.0579, 0.1116]}
                                rotation={[0, 0, -Math.PI / 2]}
                                userData={{ name: "arm_01.001" }}
                            >
                                <mesh
                                    name="arm_01001_0"
                                    geometry={nodes.arm_01001_0.geometry}
                                    material={materials["tex_03.008"]}
                                    userData={{ name: "arm_01.001_0" }}
                                />
                                <mesh
                                    name="arm_01001_1"
                                    geometry={nodes.arm_01001_1.geometry}
                                    material={materials["tex_01.008"]}
                                    userData={{ name: "arm_01.001_1" }}
                                />
                                <group
                                    name="arm_02001"
                                    position={[-0.0038, -0.1605, -0.1656]}
                                    rotation={[-0.2618, 0, 0]}
                                    userData={{ name: "arm_02.001" }}
                                >
                                    <mesh
                                        name="arm_02001_0"
                                        geometry={nodes.arm_02001_0.geometry}
                                        material={materials["tex_01.008"]}
                                        userData={{ name: "arm_02.001_0" }}
                                    />
                                    <mesh
                                        name="arm_02001_1"
                                        geometry={nodes.arm_02001_1.geometry}
                                        material={materials["tex_03.008"]}
                                        userData={{ name: "arm_02.001_1" }}
                                    />
                                    <mesh
                                        name="arm_02001_2"
                                        geometry={nodes.arm_02001_2.geometry}
                                        material={materials["tex_04.004"]}
                                        userData={{ name: "arm_02.001_2" }}
                                    />
                                    <mesh
                                        name="arm_02001_3"
                                        geometry={nodes.arm_02001_3.geometry}
                                        material={materials["tex_05.004"]}
                                        userData={{ name: "arm_02.001_3" }}
                                    />
                                    <group
                                        name="arm_03001"
                                        position={[0.0705, -0.8248, 0.0006]}
                                        rotation={[-1.2217, 0, 0]}
                                        userData={{ name: "arm_03.001" }}
                                    >
                                        <Marker
                                            id={2}
                                            title="Robotic Arm"
                                            description="The 7-foot-long (2.1 meters) robotic arm can move a lot like your arm. Its shoulder, elbow. and wrist 'joints' offer maximum flexibility. Using the arm, the rover works as a human geologist: holding and using science tools with its 'hand,' or turret. The 'hand tools' extract cores from rocks, take microscopic images. and analyze the elemental and mineral composition of Martian rocks and soil."
                                            hidden={!isSecondSection}
                                        >
                                            2
                                        </Marker>
                                        <mesh
                                            name="arm_03001_0"
                                            geometry={nodes.arm_03001_0.geometry}
                                            material={materials["tex_03.008"]}
                                            userData={{ name: "arm_03.001_0" }}
                                        />
                                        <mesh
                                            name="arm_03001_1"
                                            geometry={nodes.arm_03001_1.geometry}
                                            material={materials["tex_01.008"]}
                                            userData={{ name: "arm_03.001_1" }}
                                        />
                                        <mesh
                                            name="arm_03001_2"
                                            geometry={nodes.arm_03001_2.geometry}
                                            material={materials["tex_04.004"]}
                                            userData={{ name: "arm_03.001_2" }}
                                        />
                                        <mesh
                                            name="arm_03001_3"
                                            geometry={nodes.arm_03001_3.geometry}
                                            material={materials["tex_05.004"]}
                                            userData={{ name: "arm_03.001_3" }}
                                        />
                                        <group
                                            name="arm_04001"
                                            position={[-0.1593, 0.0013, 0.7827]}
                                            rotation={[1.4835, 0, 0]}
                                            userData={{ name: "arm_04.001" }}
                                        >
                                            <mesh
                                                name="arm_04001_0"
                                                geometry={nodes.arm_04001_0.geometry}
                                                material={materials["tex_03.008"]}
                                                userData={{ name: "arm_04.001_0" }}
                                            />
                                            <mesh
                                                name="arm_04001_1"
                                                geometry={nodes.arm_04001_1.geometry}
                                                material={materials["tex_01.008"]}
                                                userData={{ name: "arm_04.001_1" }}
                                            />
                                            <group
                                                name="arm_05_head001"
                                                position={[0.0743, 0.1013, 0.144]}
                                                rotation={[0, 0, -0.5585]}
                                                userData={{ name: "arm_05_head.001" }}
                                            >
                                                <Marker
                                                    id={7}
                                                    title="Mars Hand Lens Imager (MAHLI)"
                                                    description="MAHLI is a camera on the rover's robotic arm, and acquires microscopic images of rock and regolith.  The 'hand tools' extract cores from rocks, take microscopic images. and analyze the elemental and mineral composition of Martian rocks and soil."
                                                    hidden={!isSecondSection}
                                                >
                                                    7
                                                </Marker>
                                                <group
                                                    name="APXS"
                                                    position={[0.1892, 0.1534, 0.1575]}
                                                    userData={{ name: "APXS" }}
                                                >
                                                    <mesh
                                                        name="APXS_0"
                                                        geometry={nodes.APXS_0.geometry}
                                                        material={materials["tex_04.004"]}
                                                        userData={{ name: "APXS_0" }}
                                                    />
                                                </group>
                                                <mesh
                                                    name="arm_05_head001_0"
                                                    geometry={nodes.arm_05_head001_0.geometry}
                                                    material={materials["tex_04.004"]}
                                                    userData={{ name: "arm_05_head.001_0" }}
                                                />
                                                <group
                                                    name="bit_01001"
                                                    position={[0.0002, -0.1789, 0.14]}
                                                    userData={{ name: "bit_01.001" }}
                                                >
                                                    <mesh
                                                        name="bit_01001_0"
                                                        geometry={nodes.bit_01001_0.geometry}
                                                        material={materials["tex_03.008"]}
                                                        userData={{ name: "bit_01.001_0" }}
                                                    />
                                                </group>
                                                <group
                                                    name="CHIMERA"
                                                    position={[0.2077, -0.0482, 0.1485]}
                                                    userData={{ name: "CHIMERA" }}
                                                >
                                                    <mesh
                                                        name="CHIMERA_0"
                                                        geometry={nodes.CHIMERA_0.geometry}
                                                        material={materials["tex_04.004"]}
                                                        userData={{ name: "CHIMERA_0" }}
                                                    />
                                                    <mesh
                                                        name="CHIMERA_1"
                                                        geometry={nodes.CHIMERA_1.geometry}
                                                        material={materials["tex_05.004"]}
                                                        userData={{ name: "CHIMERA_1" }}
                                                    />
                                                </group>
                                                <group
                                                    name="Drill"
                                                    position={[-0.0364, 0.0009, 0.1755]}
                                                    userData={{ name: "Drill" }}
                                                >
                                                    <mesh
                                                        name="Drill_0"
                                                        geometry={nodes.Drill_0.geometry}
                                                        material={materials["tex_04.004"]}
                                                        userData={{ name: "Drill_0" }}
                                                    />
                                                    <mesh
                                                        name="Drill_1"
                                                        geometry={nodes.Drill_1.geometry}
                                                        material={materials["tex_05.004"]}
                                                        userData={{ name: "Drill_1" }}
                                                    />
                                                </group>
                                                <group
                                                    name="Dust_Removal_Tool"
                                                    position={[-0.2168, -0.0722, 0.1595]}
                                                    userData={{ name: "Dust Removal Tool" }}
                                                >
                                                    <mesh
                                                        name="Dust_Removal_Tool_0"
                                                        geometry={nodes.Dust_Removal_Tool_0.geometry}
                                                        material={materials["tex_04.004"]}
                                                        userData={{ name: "Dust Removal Tool_0" }}
                                                    />
                                                </group>
                                                <group
                                                    name="MAHLI"
                                                    position={[-0.1922, 0.094, 0.1412]}
                                                    userData={{ name: "MAHLI" }}
                                                >
                                                    <mesh
                                                        name="MAHLI_0"
                                                        geometry={nodes.MAHLI_0.geometry}
                                                        material={materials["tex_04.004"]}
                                                        userData={{ name: "MAHLI_0" }}
                                                    />
                                                    <group
                                                        name="MAHLI_LED_01"
                                                        position={[-0.024, 0.0415, -0.0004]}
                                                        rotation={[-1.5389, -0.992, -1.0225]}
                                                        scale={0.0017}
                                                        userData={{ name: "MAHLI_LED_01" }}
                                                    >
                                                        <mesh
                                                            name="MAHLI_LED_01_0"
                                                            geometry={nodes.MAHLI_LED_01_0.geometry}
                                                            material={materials["white_LED.004"]}
                                                            position={[-0.0001, -0.0001, 0]}
                                                            userData={{ name: "MAHLI_LED_01_0" }}
                                                        />
                                                    </group>
                                                    <group
                                                        name="MAHLI_LED_02"
                                                        position={[-0.0261, 0.0385, -0.0041]}
                                                        rotation={[-1.5389, -0.992, -1.0225]}
                                                        scale={0.0017}
                                                        userData={{ name: "MAHLI_LED_02" }}
                                                    >
                                                        <mesh
                                                            name="MAHLI_LED_02_0"
                                                            geometry={nodes.MAHLI_LED_02_0.geometry}
                                                            material={materials["white_LED.004"]}
                                                            position={[-0.0001, 0, 0]}
                                                            userData={{ name: "MAHLI_LED_02_0" }}
                                                        />
                                                    </group>
                                                    <group
                                                        name="MAHLI_LED_03"
                                                        position={[-0.0411, 0.0149, 0.0103]}
                                                        rotation={[-1.5389, -0.992, -1.0225]}
                                                        scale={0.0017}
                                                        userData={{ name: "MAHLI_LED_03" }}
                                                    >
                                                        <mesh
                                                            name="MAHLI_LED_03_0"
                                                            geometry={nodes.MAHLI_LED_03_0.geometry}
                                                            material={materials["white_LED.004"]}
                                                            position={[0.0001, -0.0001, 0]}
                                                            userData={{ name: "MAHLI_LED_03_0" }}
                                                        />
                                                    </group>
                                                    <group
                                                        name="MAHLI_LED_04"
                                                        position={[-0.0407, 0.0154, 0.0151]}
                                                        rotation={[-1.5389, -0.992, -1.0225]}
                                                        scale={0.0017}
                                                        userData={{ name: "MAHLI_LED_04" }}
                                                    >
                                                        <mesh
                                                            name="MAHLI_LED_04_0"
                                                            geometry={nodes.MAHLI_LED_04_0.geometry}
                                                            material={materials["white_LED.004"]}
                                                            userData={{ name: "MAHLI_LED_04_0" }}
                                                        />
                                                    </group>
                                                    <group
                                                        name="MAHLI_lens_cover_p"
                                                        position={[-0.0339, 0.042, 0.0269]}
                                                        rotation={[2.6996, -0.2893, 0.5064]}
                                                        userData={{ name: "MAHLI_lens_cover_p" }}
                                                    >
                                                        <group
                                                            name="MAHLI_lens_cover"
                                                            position={[0.0017, -0.0026, 0.0108]}
                                                            rotation={[-2.6189, -0.018, 0.5767]}
                                                            userData={{ name: "MAHLI_lens_cover" }}
                                                        >
                                                            <mesh
                                                                name="MAHLI_lens_cover_0"
                                                                geometry={nodes.MAHLI_lens_cover_0.geometry}
                                                                material={materials["tex_04.004"]}
                                                                userData={{ name: "MAHLI_lens_cover_0" }}
                                                            />
                                                        </group>
                                                    </group>
                                                </group>
                                            </group>
                                        </group>
                                    </group>
                                </group>
                                <group
                                    name="MAHLI_cal_target"
                                    position={[0, 0, -0.1938]}
                                    rotation={[0, 0, Math.PI / 2]}
                                    userData={{ name: "MAHLI_cal_target" }}
                                >
                                    <mesh
                                        name="MAHLI_cal_target_0"
                                        geometry={nodes.MAHLI_cal_target_0.geometry}
                                        material={materials["tex_05.004"]}
                                        userData={{ name: "MAHLI_cal_target_0" }}
                                    />
                                </group>
                            </group>
                            <group
                                name="bit_02"
                                position={[-0.4625, -1.0569, -0.1808]}
                                rotation={[0, 0, -0.4887]}
                                userData={{ name: "bit_02" }}
                            >
                                <mesh
                                    name="bit_02_0"
                                    geometry={nodes.bit_02_0.geometry}
                                    material={materials["tex_03.008"]}
                                    userData={{ name: "bit_02_0" }}
                                />
                            </group>
                            <group
                                name="bit_03"
                                position={[-0.1593, -1.0405, -0.0982]}
                                rotation={[0, 0, 0.192]}
                                userData={{ name: "bit_03" }}
                            >
                                <mesh
                                    name="bit_03_0"
                                    geometry={nodes.bit_03_0.geometry}
                                    material={materials["tex_03.008"]}
                                    userData={{ name: "bit_03_0" }}
                                />
                            </group>
                            <mesh
                                name="body_0"
                                geometry={nodes.body_0.geometry}
                                material={materials["tex_01.008"]}
                                userData={{ name: "body_0" }}
                            />
                            <mesh
                                name="body_1"
                                geometry={nodes.body_1.geometry}
                                material={materials["tex_02.004"]}
                                userData={{ name: "body_1" }}
                            />
                            <mesh
                                name="body_2"
                                geometry={nodes.body_2.geometry}
                                material={materials["tex_04.004"]}
                                userData={{ name: "body_2" }}
                            />
                            <mesh
                                name="body_3"
                                geometry={nodes.body_3.geometry}
                                material={materials["tex_03.008"]}
                                userData={{ name: "body_3" }}
                            />
                            <mesh
                                name="body_4"
                                geometry={nodes.body_4.geometry}
                                material={materials["tex_01.009"]}
                                userData={{ name: "body_4" }}
                            />
                            <mesh
                                name="body_5"
                                geometry={nodes.body_5.geometry}
                                material={materials["parts_AO.004"]}
                                userData={{ name: "body_5" }}
                            />
                            <group
                                name="lens_covers_front"
                                position={[-0.0907, -0.851, -0.1975]}
                                rotation={[2.3658, 0, 0]}
                                userData={{ name: "lens_covers_front" }}
                            >
                                <mesh
                                    name="lens_covers_front_0"
                                    geometry={nodes.lens_covers_front_0.geometry}
                                    material={materials["parts_AO.004"]}
                                    userData={{ name: "lens_covers_front_0" }}
                                />
                            </group>
                            <group
                                name="lens_covers_rear"
                                position={[0.501, 1.0926, -0.1384]}
                                rotation={[2.8798, 0, 0]}
                                userData={{ name: "lens_covers_rear" }}
                            >
                                <mesh
                                    name="lens_covers_rear_0"
                                    geometry={nodes.lens_covers_rear_0.geometry}
                                    material={materials["parts_AO.004"]}
                                    userData={{ name: "lens_covers_rear_0" }}
                                />
                            </group>
                            <group
                                name="mast_p"
                                position={[-0.5582, -0.6605, 0.339]}
                                rotation={[-Math.PI / 2, 0.9948, Math.PI / 2]}
                                userData={{ name: "mast_p" }}
                            >
                                <group
                                    name="mast_01001"
                                    position={[-0.055, -0.0136, 0.1835]}
                                    rotation={[0, 0, -0.576]}
                                    userData={{ name: "mast_01.001" }}
                                >
                                    <group
                                        name="mast_01000"
                                        position={[-0.0396, -0.0013, 0.1023]}
                                        userData={{ name: "mast_01.000" }}
                                    >
                                        <mesh
                                            name="mast_01000_0"
                                            geometry={nodes.mast_01000_0.geometry}
                                            material={materials["tex_04.004"]}
                                            userData={{ name: "mast_01.000_0" }}
                                        />
                                    </group>
                                    <mesh
                                        name="mast_01001_0"
                                        geometry={nodes.mast_01001_0.geometry}
                                        material={materials["tex_04.004"]}
                                        userData={{ name: "mast_01.001_0" }}
                                    />
                                    <group
                                        name="mast_02001"
                                        position={[0.0379, 0.0429, 0.2913]}
                                        rotation={[0, 0, 2.1468]}
                                        userData={{ name: "mast_02.001" }}
                                    >
                                        <mesh
                                            name="mast_02001_0"
                                            geometry={nodes.mast_02001_0.geometry}
                                            material={materials["tex_04.004"]}
                                            userData={{ name: "mast_02.001_0" }}
                                        />
                                        <group
                                            name="mast_03001"
                                            position={[0.0207, 0, 0.2021]}
                                            userData={{ name: "mast_03.001" }}
                                        >
                                            <group
                                                name="ChemCam"
                                                position={[0, 0, 0.0001]}
                                                userData={{ name: "ChemCam" }}
                                            >
                                                <Marker
                                                    id={1}
                                                    title="Mast Camera"
                                                    description="This is the rover head. The Mastcam system provides multiple spectra and true-color imaging with two cameras. The cameras can take true-color images at 1600×1200 pixels and up to 10 frames per second hardware-compressed video at 720p (1280×720)."
                                                    hidden={!isSecondSection}
                                                >
                                                    1
                                                </Marker>
                                                <mesh
                                                    name="ChemCam_0"
                                                    geometry={nodes.ChemCam_0.geometry}
                                                    material={materials["tex_04.004"]}
                                                    userData={{ name: "ChemCam_0" }}
                                                />
                                            </group>
                                            <mesh
                                                name="mast_03001_0"
                                                geometry={nodes.mast_03001_0.geometry}
                                                material={materials["tex_04.004"]}
                                                userData={{ name: "mast_03.001_0" }}
                                            />
                                            <group
                                                name="MastCam"
                                                position={[0, 0, 0.0001]}
                                                userData={{ name: "MastCam" }}
                                            >
                                                <mesh
                                                    name="MastCam_0"
                                                    geometry={nodes.MastCam_0.geometry}
                                                    material={materials["tex_04.004"]}
                                                    userData={{ name: "MastCam_0" }}
                                                />
                                            </group>
                                            <group
                                                name="NavCam"
                                                position={[0, 0, 0.0001]}
                                                userData={{ name: "NavCam" }}
                                            >
                                                <mesh
                                                    name="NavCam_0"
                                                    geometry={nodes.NavCam_0.geometry}
                                                    material={materials["tex_04.004"]}
                                                    userData={{ name: "NavCam_0" }}
                                                />
                                            </group>
                                        </group>
                                    </group>
                                </group>
                            </group>
                            <group
                                name="suspension_axel_L"
                                position={[0.641, -0.159, -0.011]}
                                userData={{ name: "suspension_axel_L" }}
                            >
                                <group
                                    name="suspension_arm_B_L_p"
                                    position={[0.1534, 0, 0.0095]}
                                    rotation={[0.8697, -0.1276, 0.1496]}
                                    userData={{ name: "suspension_arm_B_L_p" }}
                                >
                                    <group
                                        name="suspension_arm_B_L"
                                        position={[-0.0252, 0.3643, -0.1008]}
                                        rotation={[0, 0.1963, 0]}
                                        userData={{ name: "suspension_arm_B_L" }}
                                    >
                                        <group
                                            name="Cube_03_p"
                                            position={[0.1979, 0.3897, -0.1378]}
                                            userData={{ name: "Cube_03_p" }}
                                        >
                                            <group
                                                name="suspension_arm_B2_L"
                                                position={[-0.1923, 0, 0]}
                                                rotation={[-0.7241, 0, 0]}
                                                userData={{ name: "suspension_arm_B2_L" }}
                                            >
                                                <mesh
                                                    name="suspension_arm_B2_L_0"
                                                    geometry={nodes.suspension_arm_B2_L_0.geometry}
                                                    material={materials["tex_03.008"]}
                                                    userData={{ name: "suspension_arm_B2_L_0" }}
                                                />
                                                <mesh
                                                    name="suspension_arm_B2_L_1"
                                                    geometry={nodes.suspension_arm_B2_L_1.geometry}
                                                    material={materials["tex_02.004"]}
                                                    userData={{ name: "suspension_arm_B2_L_1" }}
                                                />
                                                <group
                                                    name="suspension_steer_B_L"
                                                    position={[0.2628, 0.624, 0.0081]}
                                                    userData={{ name: "suspension_steer_B_L" }}
                                                >
                                                    <mesh
                                                        name="suspension_steer_B_L_0"
                                                        geometry={nodes.suspension_steer_B_L_0.geometry}
                                                        material={materials["tex_03.008"]}
                                                        userData={{ name: "suspension_steer_B_L_0" }}
                                                    />
                                                    <mesh
                                                        name="suspension_steer_B_L_1"
                                                        geometry={nodes.suspension_steer_B_L_1.geometry}
                                                        material={materials["tex_02.004"]}
                                                        userData={{ name: "suspension_steer_B_L_1" }}
                                                    />
                                                    <group
                                                        name="wheel_03_L"
                                                        position={[0.0005, -0.0012, -0.3995]}
                                                        userData={{ name: "wheel_03_L" }}
                                                    >
                                                        <mesh
                                                            name="wheel_03_L_0"
                                                            geometry={nodes.wheel_03_L_0.geometry}
                                                            material={materials["tex_03_n.004"]}
                                                            userData={{ name: "wheel_03_L_0" }}
                                                        />
                                                    </group>
                                                </group>
                                                <group
                                                    name="wheel_02_L"
                                                    position={[0.3939, -0.451, -0.4]}
                                                    userData={{ name: "wheel_02_L" }}
                                                >
                                                    <mesh
                                                        name="wheel_02_L_0"
                                                        geometry={nodes.wheel_02_L_0.geometry}
                                                        material={materials["tex_03_n.004"]}
                                                        userData={{ name: "wheel_02_L_0" }}
                                                    />
                                                </group>
                                            </group>
                                        </group>
                                        <mesh
                                            name="suspension_arm_B_L_0"
                                            geometry={nodes.suspension_arm_B_L_0.geometry}
                                            material={materials["tex_03.008"]}
                                            userData={{ name: "suspension_arm_B_L_0" }}
                                        />
                                        <mesh
                                            name="suspension_arm_B_L_1"
                                            geometry={nodes.suspension_arm_B_L_1.geometry}
                                            material={materials["tex_05.004"]}
                                            userData={{ name: "suspension_arm_B_L_1" }}
                                        />
                                    </group>
                                </group>
                                <group
                                    name="suspension_arm_F_L_p"
                                    position={[0.1539, 0.0025, 0.0068]}
                                    rotation={[-0.8283, -0.1337, -0.1442]}
                                    userData={{ name: "suspension_arm_F_L_p" }}
                                >
                                    <group
                                        name="suspension_arm_F_L"
                                        rotation={[0, 0.1963, 0]}
                                        userData={{ name: "suspension_arm_F_L" }}
                                    >
                                        <group
                                            name="Cube_01_p"
                                            position={[0.2631, -0.881, -0.0022]}
                                            userData={{ name: "Cube_01_p" }}
                                        >
                                            <group
                                                name="suspension_steer_F_L"
                                                position={[0.0002, 0, -0.24]}
                                                rotation={[0, 0, -0.8388]}
                                                userData={{ name: "suspension_steer_F_L" }}
                                            >
                                                <mesh
                                                    name="suspension_steer_F_L_0"
                                                    geometry={nodes.suspension_steer_F_L_0.geometry}
                                                    material={materials["tex_03.008"]}
                                                    userData={{ name: "suspension_steer_F_L_0" }}
                                                />
                                                <mesh
                                                    name="suspension_steer_F_L_1"
                                                    geometry={nodes.suspension_steer_F_L_1.geometry}
                                                    material={materials["tex_02.004"]}
                                                    userData={{ name: "suspension_steer_F_L_1" }}
                                                />
                                                <group
                                                    name="wheel_01_L"
                                                    position={[0.0004, -0.0001, -0.3996]}
                                                    userData={{ name: "wheel_01_L" }}
                                                >
                                                    <mesh
                                                        name="wheel_01_L_0"
                                                        geometry={nodes.wheel_01_L_0.geometry}
                                                        material={materials["tex_03_n.004"]}
                                                        userData={{ name: "wheel_01_L_0" }}
                                                    />
                                                </group>
                                            </group>
                                        </group>
                                        <mesh
                                            name="suspension_arm_F_L_0"
                                            geometry={nodes.suspension_arm_F_L_0.geometry}
                                            material={materials["tex_03.008"]}
                                            userData={{ name: "suspension_arm_F_L_0" }}
                                        />
                                        <mesh
                                            name="suspension_arm_F_L_1"
                                            geometry={nodes.suspension_arm_F_L_1.geometry}
                                            material={materials["tex_05.004"]}
                                            userData={{ name: "suspension_arm_F_L_1" }}
                                        />
                                    </group>
                                </group>
                                <group
                                    name="suspension_axel_L2"
                                    position={[-0.0073, 0, -0.0024]}
                                    rotation={[3.1415, 0.001, 0]}
                                    scale={-1}
                                    userData={{ name: "suspension_axel_L2" }}
                                >
                                    <mesh
                                        name="suspension_axel_L2_0"
                                        geometry={nodes.suspension_axel_L2_0.geometry}
                                        material={materials["tex_03.008"]}
                                        userData={{ name: "suspension_axel_L2_0" }}
                                    />
                                </group>
                                <mesh
                                    name="suspension_axel_L_0"
                                    geometry={nodes.suspension_axel_L_0.geometry}
                                    material={materials["tex_03.009"]}
                                    userData={{ name: "suspension_axel_L_0" }}
                                />
                                <group
                                    name="suspension_rod_L"
                                    position={[0.0308, 0, 0.2685]}
                                    rotation={[0.0097, 0, -Math.PI]}
                                    userData={{ name: "suspension_rod_L" }}
                                >
                                    <mesh
                                        name="suspension_rod_L_0"
                                        geometry={nodes.suspension_rod_L_0.geometry}
                                        material={materials["tex_03.008"]}
                                        userData={{ name: "suspension_rod_L_0" }}
                                    />
                                </group>
                            </group>
                            <group
                                name="suspension_axel_R"
                                position={[-0.638, -0.159, -0.011]}
                                userData={{ name: "suspension_axel_R" }}
                            >
                                <group
                                    name="suspension_arm_B_R_p"
                                    position={[-0.1612, 0, 0.0095]}
                                    rotation={[0.8698, 0.1276, -0.1496]}
                                    userData={{ name: "suspension_arm_B_R_p" }}
                                >
                                    <Marker
                                        id={4}
                                        title="Suspension"
                                        description="Like NASA's previous rovers, Perseverance uses a 'rocker-bogie' suspension system . The suspension system connects the wheels to the rover and controls how the rover interacts with the Martian terrain."
                                        hidden={!isSecondSection}
                                    >
                                        4
                                    </Marker>
                                    <group
                                        name="suspension_arm_B_R"
                                        position={[0.0252, 0.3643, -0.1008]}
                                        rotation={[0, -0.1963, 0]}
                                        userData={{ name: "suspension_arm_B_R" }}
                                    >
                                        <group
                                            name="Cube_04_p"
                                            position={[-0.1979, 0.3897, -0.1378]}
                                            userData={{ name: "Cube_04_p" }}
                                        >
                                            <group
                                                name="suspension_arm_B2_R"
                                                position={[0.1923, 0, 0]}
                                                rotation={[-0.7241, 0, 0]}
                                                userData={{ name: "suspension_arm_B2_R" }}
                                            >
                                                <mesh
                                                    name="suspension_arm_B2_R_0"
                                                    geometry={nodes.suspension_arm_B2_R_0.geometry}
                                                    material={materials["tex_03.008"]}
                                                    userData={{ name: "suspension_arm_B2_R_0" }}
                                                />
                                                <mesh
                                                    name="suspension_arm_B2_R_1"
                                                    geometry={nodes.suspension_arm_B2_R_1.geometry}
                                                    material={materials["tex_02.004"]}
                                                    userData={{ name: "suspension_arm_B2_R_1" }}
                                                />
                                                <group
                                                    name="suspension_steer_B_R"
                                                    position={[-0.2628, 0.624, -0.0006]}
                                                    userData={{ name: "suspension_steer_B_R" }}
                                                >
                                                    <mesh
                                                        name="suspension_steer_B_R_0"
                                                        geometry={nodes.suspension_steer_B_R_0.geometry}
                                                        material={materials["tex_03.008"]}
                                                        userData={{ name: "suspension_steer_B_R_0" }}
                                                    />
                                                    <mesh
                                                        name="suspension_steer_B_R_1"
                                                        geometry={nodes.suspension_steer_B_R_1.geometry}
                                                        material={materials["tex_02.004"]}
                                                        userData={{ name: "suspension_steer_B_R_1" }}
                                                    />
                                                    <group
                                                        name="wheel_03_R"
                                                        position={[-0.0005, 0.0012, -0.3995]}
                                                        userData={{ name: "wheel_03_R" }}
                                                    >
                                                        <mesh
                                                            name="wheel_03_R_0"
                                                            geometry={nodes.wheel_03_R_0.geometry}
                                                            material={materials["tex_03_n.004"]}
                                                            userData={{ name: "wheel_03_R_0" }}
                                                        />
                                                    </group>
                                                </group>
                                                <group
                                                    name="wheel_02_R"
                                                    position={[-0.3939, -0.451, -0.4]}
                                                    userData={{ name: "wheel_02_R" }}
                                                >
                                                    <mesh
                                                        name="wheel_02_R_0"
                                                        geometry={nodes.wheel_02_R_0.geometry}
                                                        material={materials["tex_03_n.004"]}
                                                        userData={{ name: "wheel_02_R_0" }}
                                                    />
                                                </group>
                                            </group>
                                        </group>
                                        <mesh
                                            name="suspension_arm_B_R_0"
                                            geometry={nodes.suspension_arm_B_R_0.geometry}
                                            material={materials["tex_03.008"]}
                                            userData={{ name: "suspension_arm_B_R_0" }}
                                        />
                                        <mesh
                                            name="suspension_arm_B_R_1"
                                            geometry={nodes.suspension_arm_B_R_1.geometry}
                                            material={materials["tex_05.004"]}
                                            userData={{ name: "suspension_arm_B_R_1" }}
                                        />
                                    </group>
                                </group>
                                <group
                                    name="suspension_arm_F_R_p"
                                    position={[-0.1612, 0, 0.0095]}
                                    rotation={[-0.8284, 0.1337, 0.1442]}
                                    userData={{ name: "suspension_arm_F_R_p" }}
                                >
                                    <group
                                        name="suspension_arm_F_R"
                                        rotation={[0, -0.1963, 0]}
                                        userData={{ name: "suspension_arm_F_R" }}
                                    >
                                        <group
                                            name="Cube_02_p"
                                            position={[-0.2628, -0.881, -0.0049]}
                                            userData={{ name: "Cube_02_p" }}
                                        >
                                            <group
                                                name="suspension_steer_F_R"
                                                position={[-0.0005, 0, -0.2373]}
                                                rotation={[0, 0, 0.8407]}
                                                userData={{ name: "suspension_steer_F_R" }}
                                            >
                                                <mesh
                                                    name="suspension_steer_F_R_0"
                                                    geometry={nodes.suspension_steer_F_R_0.geometry}
                                                    material={materials["tex_03.008"]}
                                                    userData={{ name: "suspension_steer_F_R_0" }}
                                                />
                                                <mesh
                                                    name="suspension_steer_F_R_1"
                                                    geometry={nodes.suspension_steer_F_R_1.geometry}
                                                    material={materials["tex_02.004"]}
                                                    userData={{ name: "suspension_steer_F_R_1" }}
                                                />
                                                <group
                                                    name="wheel_01_R"
                                                    position={[-0.0004, 0.0001, -0.3996]}
                                                    userData={{ name: "wheel_01_R" }}
                                                >
                                                    <Marker
                                                        id={5}
                                                        title="Wheels"
                                                        description="Curiosity is equipped with six 50 cm (20 in) diameter wheels in a rocker-bogie suspension. Engineers redesigned the Mars 2020 Perseverance rover's wheels to be more robust, due to wear and tear the Curiosity rover wheels endured while driving over sharp, pointy rocks. The four-wheel steering also lets the rover swerve and curve, making arcing turns."
                                                        hidden={!isSecondSection}
                                                    >
                                                        5
                                                    </Marker>
                                                    <mesh
                                                        name="wheel_01_R_0"
                                                        geometry={nodes.wheel_01_R_0.geometry}
                                                        material={materials["tex_03_n.004"]}
                                                        userData={{ name: "wheel_01_R_0" }}
                                                    />
                                                </group>
                                            </group>
                                        </group>
                                        <mesh
                                            name="suspension_arm_F_R_0"
                                            geometry={nodes.suspension_arm_F_R_0.geometry}
                                            material={materials["tex_03.008"]}
                                            userData={{ name: "suspension_arm_F_R_0" }}
                                        />
                                        <mesh
                                            name="suspension_arm_F_R_1"
                                            geometry={nodes.suspension_arm_F_R_1.geometry}
                                            material={materials["tex_05.004"]}
                                            userData={{ name: "suspension_arm_F_R_1" }}
                                        />
                                    </group>
                                </group>
                                <group
                                    name="suspension_axel_R2"
                                    position={[0.0043, 0, -0.0023]}
                                    userData={{ name: "suspension_axel_R2" }}
                                >
                                    <mesh
                                        name="suspension_axel_R2_0"
                                        geometry={nodes.suspension_axel_R2_0.geometry}
                                        material={materials["tex_03.008"]}
                                        userData={{ name: "suspension_axel_R2_0" }}
                                    />
                                </group>
                                <mesh
                                    name="suspension_axel_R_0"
                                    geometry={nodes.suspension_axel_R_0.geometry}
                                    material={materials["tex_03.009"]}
                                    userData={{ name: "suspension_axel_R_0" }}
                                />
                                <group
                                    name="suspension_rod_R"
                                    position={[-0.0333, 0.0002, 0.2672]}
                                    rotation={[0.0166, -0.0013, 0.0027]}
                                    userData={{ name: "suspension_rod_R" }}
                                >
                                    <mesh
                                        name="suspension_rod_R_0"
                                        geometry={nodes.suspension_rod_R_0.geometry}
                                        material={materials["tex_03.008"]}
                                        userData={{ name: "suspension_rod_R_0" }}
                                    />
                                </group>
                            </group>
                            <group
                                name="suspension_xmember"
                                position={[0.0004, 0.197, 0.2881]}
                                rotation={[0, 0, 0.0074]}
                                userData={{ name: "suspension_xmember" }}
                            >
                                <mesh
                                    name="suspension_xmember_0"
                                    geometry={nodes.suspension_xmember_0.geometry}
                                    material={materials["tex_02.004"]}
                                    userData={{ name: "suspension_xmember_0" }}
                                />
                                <mesh
                                    name="suspension_xmember_1"
                                    geometry={nodes.suspension_xmember_1.geometry}
                                    material={materials["tex_05.004"]}
                                    userData={{ name: "suspension_xmember_1" }}
                                />
                            </group>
                        </group>
                        <group name="Chassis" position={[0, -0.055, 0.8864]} userData={{ name: "Chassis" }}>
                            <group
                                name="antenna_LG"
                                position={[0.495, 0.9919, 0.5842]}
                                userData={{ name: "antenna_LG" }}
                            >
                                <mesh
                                    name="antenna_LG_0"
                                    geometry={nodes.antenna_LG_0.geometry}
                                    material={materials["tex_02.004"]}
                                    userData={{ name: "antenna_LG_0" }}
                                />
                            </group>
                            <group
                                name="antenna_UHF"
                                position={[-0.5049, 1.138, 0.7341]}
                                userData={{ name: "antenna_UHF" }}
                            >
                                <Marker
                                    id={8}
                                    title="Antenna UHF"
                                    description="Curiosity is equipped with significant telecommunication redundancy by several means: an X band transmitter and receiver that can communicate directly with Earth, and an Ultra high frequency (UHF) Electra-Lite software-defined radio for communicating with Mars orbiters. Main job is transmitting data to Earth through Mars orbiters"
                                    hidden={!isSecondSection}
                                >
                                    8
                                </Marker>
                                <mesh
                                    name="antenna_UHF_0"
                                    geometry={nodes.antenna_UHF_0.geometry}
                                    material={materials["tex_02.004"]}
                                    userData={{ name: "antenna_UHF_0" }}
                                />
                            </group>
                            <group name="body001" userData={{ name: "body.001" }}>
                                <mesh
                                    name="body001_0"
                                    geometry={nodes.body001_0.geometry}
                                    material={materials["tex_03.008"]}
                                    userData={{ name: "body.001_0" }}
                                />
                            </group>
                            <mesh
                                name="Chassis_0"
                                geometry={nodes.Chassis_0.geometry}
                                material={materials["tex_03.008"]}
                                userData={{ name: "Chassis_0" }}
                            />
                            <mesh
                                name="Chassis_1"
                                geometry={nodes.Chassis_1.geometry}
                                material={materials["tex_01.008"]}
                                userData={{ name: "Chassis_1" }}
                            />
                            <mesh
                                name="Chassis_2"
                                geometry={nodes.Chassis_2.geometry}
                                material={materials["tex_02.004"]}
                                userData={{ name: "Chassis_2" }}
                            />
                            <mesh
                                name="Chassis_3"
                                geometry={nodes.Chassis_3.geometry}
                                material={materials["tex_05.004"]}
                                userData={{ name: "Chassis_3" }}
                            />
                            <group name="CheMin" position={[0.1227, -0.6218, 0.2424]} userData={{ name: "CheMin" }}>
                                <mesh
                                    name="CheMin_0"
                                    geometry={nodes.CheMin_0.geometry}
                                    material={materials["tex_01.008"]}
                                    userData={{ name: "CheMin_0" }}
                                />
                            </group>
                            <group name="cover_01" position={[0.2126, -0.5633, 0.2275]} userData={{ name: "cover_01" }}>
                                <mesh
                                    name="cover_01_0"
                                    geometry={nodes.cover_01_0.geometry}
                                    material={materials["tex_01.008"]}
                                    userData={{ name: "cover_01_0" }}
                                />
                            </group>
                            <group name="cover_02" position={[-0.277, -0.6886, 0.2292]} userData={{ name: "cover_02" }}>
                                <mesh
                                    name="cover_02_0"
                                    geometry={nodes.cover_02_0.geometry}
                                    material={materials["tex_01.008"]}
                                    userData={{ name: "cover_02_0" }}
                                />
                            </group>
                            <group
                                name="cover_03"
                                position={[-0.1546, -0.5164, 0.2291]}
                                userData={{ name: "cover_03" }}
                            >
                                <Marker
                                    id={9}
                                    title="Sample Handling"
                                    description="The Perseverance rover is the first mission to demonstrate gathering samples from Martian rocks and soil using its drill. The rover stores the sample cores in tubes on the Martian surface. This sample caching process could potentially pave the way for future missions to collect the samples and return them to Earth for intensive laboratory analysis."
                                    hidden={!isSecondSection}
                                >
                                    9
                                </Marker>
                                <mesh
                                    name="cover_03_0"
                                    geometry={nodes.cover_03_0.geometry}
                                    material={materials["tex_01.008"]}
                                    userData={{ name: "cover_03_0" }}
                                />
                            </group>
                            <group name="DAN_L" position={[0.5765, 0.9273, -0.014]} userData={{ name: "DAN_L" }}>
                                <mesh
                                    name="DAN_L_0"
                                    geometry={nodes.DAN_L_0.geometry}
                                    material={materials["tex_02.004"]}
                                    userData={{ name: "DAN_L_0" }}
                                />
                            </group>
                            <group name="DAN_R" position={[-0.5765, 0.9175, 0.0021]} userData={{ name: "DAN_R" }}>
                                <mesh
                                    name="DAN_R_0"
                                    geometry={nodes.DAN_R_0.geometry}
                                    material={materials["tex_02.004"]}
                                    userData={{ name: "DAN_R_0" }}
                                />
                            </group>
                            <group
                                name="HazCam_-_front"
                                position={[0.0397, -0.822, -0.1597]}
                                userData={{ name: "HazCam - front" }}
                            >
                                <mesh
                                    name="HazCam_-_front_0"
                                    geometry={nodes["HazCam_-_front_0"].geometry}
                                    material={materials["tex_02.004"]}
                                    userData={{ name: "HazCam - front_0" }}
                                />
                            </group>
                            <group
                                name="HazCam_-_rear"
                                position={[0, 1.1076, -0.0641]}
                                userData={{ name: "HazCam - rear" }}
                            >
                                <mesh
                                    name="HazCam_-_rear_0"
                                    geometry={nodes["HazCam_-_rear_0"].geometry}
                                    material={materials["tex_02.004"]}
                                    userData={{ name: "HazCam - rear_0" }}
                                />
                            </group>
                            <group
                                name="MARDI001"
                                position={[0.6475, -0.6087, -0.1529]}
                                userData={{ name: "MARDI.001" }}
                            >
                                <mesh
                                    name="MARDI001_0"
                                    geometry={nodes.MARDI001_0.geometry}
                                    material={materials["tex_03.008"]}
                                    userData={{ name: "MARDI.001_0" }}
                                />
                            </group>
                            <group
                                name="RAD"
                                position={[0.3483, -0.0093, 0.2356]}
                                scale={0.0618}
                                userData={{ name: "RAD" }}
                            >
                                <mesh
                                    name="RAD_0"
                                    geometry={nodes.RAD_0.geometry}
                                    material={materials["tex_01.008"]}
                                    userData={{ name: "RAD_0" }}
                                />
                            </group>
                            <group name="radiators" userData={{ name: "radiators" }}>
                                <mesh
                                    name="radiators_0"
                                    geometry={nodes.radiators_0.geometry}
                                    material={materials["tex_03.008"]}
                                    userData={{ name: "radiators_0" }}
                                />
                            </group>
                            <group
                                name="REMS"
                                position={[-0.2242, -0.4916, 0.2364]}
                                rotation={[0, 0, -2.7563]}
                                scale={[0.0236, 0.0298, 0.0298]}
                                userData={{ name: "REMS" }}
                            >
                                <mesh
                                    name="REMS_0"
                                    geometry={nodes.REMS_0.geometry}
                                    material={materials["tex_01.008"]}
                                    userData={{ name: "REMS_0" }}
                                />
                            </group>
                            <group name="RTG" position={[0, 1.2595, 0.2642]} userData={{ name: "RTG" }}>
                                <Marker
                                    id={6}
                                    title="Power source"
                                    description="For electrical power, Perseverance carries a radioisotope power system (RPS). This system produces a dependable electricity flow using the heat of plutonium-238's radioactive decay as its 'fuel.' The power source, called a Multi-Mission Radioisotope Thermoelectric Generator (MMRTG), has a 14-year operational lifetime."
                                    hidden={!isSecondSection}
                                >
                                    6
                                </Marker>
                                <mesh
                                    name="RTG_0"
                                    geometry={nodes.RTG_0.geometry}
                                    material={materials["tex_03.008"]}
                                    userData={{ name: "RTG_0" }}
                                />
                            </group>
                            <group name="SAM" position={[-0.1638, -0.6262, 0.2431]} userData={{ name: "SAM" }}>
                                <mesh
                                    name="SAM_0"
                                    geometry={nodes.SAM_0.geometry}
                                    material={materials["tex_01.008"]}
                                    userData={{ name: "SAM_0" }}
                                />
                            </group>
                            <group name="sundial" position={[-0.5141, 0.436, 0.4296]} userData={{ name: "sundial" }}>
                                <mesh
                                    name="sundial_0"
                                    geometry={nodes.sundial_0.geometry}
                                    material={materials["tex_01.008"]}
                                    userData={{ name: "sundial_0" }}
                                />
                            </group>
                        </group>
                    </group>
                </group>
            </group>
            <mesh
                name="Ground"
                geometry={nodes.Ground.geometry}
                position={[0, -0.2287, 0]}
                material={bakedGroundMaterial}
            />
        </group>
    );
};

export default Model;

useGLTF.preload(config.model);
