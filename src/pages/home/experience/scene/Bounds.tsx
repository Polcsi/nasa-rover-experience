import { CuboidCollider, RigidBody } from "@react-three/rapier";
import config from "@experience/config";

const Bounds = () => {
    return (
        <RigidBody type="fixed" colliders={false} restitution={0.2} friction={1}>
            {/* Front */}
            <CuboidCollider
                args={[
                    config.models.terrain.size / 2,
                    config.models.terrain.bounds.height,
                    config.models.terrain.bounds.width,
                ]}
                position={[
                    0,
                    config.models.terrain.bounds.height + config.models.terrain.bounds.position.y,
                    (config.models.terrain.size / 2 + config.models.terrain.bounds.width) * -1,
                ]}
                restitution={0.2}
                friction={1}
            />
            {/* Back */}
            <CuboidCollider
                args={[
                    config.models.terrain.size / 2,
                    config.models.terrain.bounds.height,
                    config.models.terrain.bounds.width,
                ]}
                position={[
                    0,
                    config.models.terrain.bounds.height + config.models.terrain.bounds.position.y,
                    config.models.terrain.size / 2 + config.models.terrain.bounds.width,
                ]}
                restitution={0.2}
                friction={1}
            />
            {/* Right */}
            <CuboidCollider
                args={[
                    config.models.terrain.bounds.width,
                    config.models.terrain.bounds.height,
                    config.models.terrain.size / 2,
                ]}
                position={[
                    config.models.terrain.size / 2 + config.models.terrain.bounds.width,
                    config.models.terrain.bounds.height + config.models.terrain.bounds.position.y,
                    0,
                ]}
                restitution={0.2}
                friction={1}
            />
            {/* Left */}
            <CuboidCollider
                args={[
                    config.models.terrain.bounds.width,
                    config.models.terrain.bounds.height,
                    config.models.terrain.size / 2,
                ]}
                position={[
                    (config.models.terrain.size / 2 + config.models.terrain.bounds.width) * -1,
                    config.models.terrain.bounds.height + config.models.terrain.bounds.position.y,
                    0,
                ]}
                restitution={0.2}
                friction={1}
            />
        </RigidBody>
    );
};

export default Bounds;
