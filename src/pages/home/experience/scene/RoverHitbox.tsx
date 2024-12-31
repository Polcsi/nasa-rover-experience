import { CylinderCollider, RigidBody } from "@react-three/rapier";

const RoverHitbox = () => {
    return (
        <RigidBody colliders={false} position={[1, 0, 0]} restitution={1} friction={0.7}>
            <CylinderCollider args={[0.2, 0.255]} rotation={[0, 0, Math.PI / 2]} />
        </RigidBody>
    );
};

export default RoverHitbox;
