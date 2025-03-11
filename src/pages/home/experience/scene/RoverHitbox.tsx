import React from "react";
import { useFrame } from "@react-three/fiber";
import {
    CuboidCollider,
    CylinderCollider,
    quat,
    type RapierRigidBody,
    RigidBody,
    type Vector3Tuple,
    useRevoluteJoint,
} from "@react-three/rapier";
import { useKeyboardContext } from "@keyboard/KeyboardContext";

type WheelJointProps = {
    body: React.RefObject<RapierRigidBody>;
    wheel: React.RefObject<RapierRigidBody>;
    bodyAnchor: Vector3Tuple;
    wheelAnchor: Vector3Tuple;
    rotationAxis: Vector3Tuple;
};

const WheelJoint = ({ body, wheel, bodyAnchor, wheelAnchor, rotationAxis }: WheelJointProps) => {
    const joint = useRevoluteJoint(body, wheel, [bodyAnchor, wheelAnchor, rotationAxis]);
    const [, , getKeys] = useKeyboardContext();

    useFrame(() => {
        if (joint.current) {
            const { forward, backward, right, left } = getKeys();

            if (forward) {
                joint.current.configureMotorVelocity(20, 5);
            }

            if (backward) {
                joint.current.configureMotorVelocity(-20, 5);
            }
        }
    });

    return null;
};

const RoverHitbox = () => {
    const bodyRef = React.useRef<RapierRigidBody>(null);
    const wheelPositions: [number, number, number][] = [
        [1, 0, 1], // Front Left
        [-1, 0, 1], // Front Right
        [1, 0, 0], // Middle Left
        [-1, 0, 0], // Middle Right
        [1, 0, -1], // Back Left
        [-1, 0, -1], // Back Right
    ];
    const wheelRefs = React.useRef(wheelPositions.map(() => React.createRef<RapierRigidBody>()));
    const [, , getKeys] = useKeyboardContext();

    // useFrame((state, delta) => {
    //     if (body.current) {
    //         const { forward, backward, right, left } = getKeys();

    //         const quaternion = quat(body.current.rotation());
    //         const impulse = { x: 0, y: 0, z: 0 };
    //         const torque = { x: 0, y: 0, z: 0 };

    //         const impulseStrength = 0.2 * delta;
    //         const torqueStrength = 0.001 * delta;
    //         const rotationStrength = 0.1 * delta;

    //         if (forward) {
    //             impulse.z += impulseStrength;
    //             torque.x += torqueStrength;
    //             // quaternion.z += rotationStrength;
    //         }

    //         if (backward) {
    //             impulse.z -= impulseStrength;
    //             torque.x -= torqueStrength;
    //         }

    //         // if (right) {
    //         //     impulse.x -= impulseStrength;
    //         //     torque.z += torqueStrength;
    //         // }
    //         // if (left) {
    //         //     impulse.x += impulseStrength;
    //         //     torque.z -= torqueStrength;
    //         // }

    //         body.current.applyImpulse(impulse, true);
    //         body.current.applyTorqueImpulse(torque, true);
    //         body.current.setRotation(quaternion, true);
    //     }
    // });

    return (
        <group>
            <RigidBody
                ref={bodyRef}
                colliders={false}
                type="dynamic"
                position={[0, 0.9, -0.26]}
                canSleep={false}
                restitution={0.2}
                friction={1}
                angularDamping={1}
            >
                <CuboidCollider args={[0.7, 0.1, 1.4]} />
            </RigidBody>
            {wheelPositions.map((position, index) => (
                <RigidBody
                    key={index}
                    ref={wheelRefs.current[index]}
                    position={position}
                    type="dynamic"
                    colliders={false}
                    canSleep={false}
                    friction={1}
                    restitution={0.2}
                >
                    <CylinderCollider args={[0.2, 0.255]} rotation={[0, 0, Math.PI / 2]} />
                </RigidBody>
            ))}
            {wheelPositions.map((wheelPosition, index) => (
                <WheelJoint
                    key={index}
                    body={bodyRef}
                    wheel={wheelRefs.current[index]}
                    bodyAnchor={wheelPosition}
                    wheelAnchor={[0, 0, 0]}
                    rotationAxis={[1, 0, 0]}
                />
            ))}
        </group>
    );
};

export default RoverHitbox;
