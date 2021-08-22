import { Collider } from "../components/Collider";
import { Position } from "../components/Position";
import { Size } from "../components/Size";
import { Entity } from "../entities/Base";
import { PhysicsWorld } from "../PhysicsWorld";
import { System } from "./Base";

export class CollisionDetection extends System {
  components = [Collider, Position, Size];

  execute(entity: Entity) {
    PhysicsWorld.detectCollisionFor(
      entity,
      ({ origin, target }) => {
        const originCollider = origin.component<Collider>(Collider);
        if (!originCollider.collisions[target.id]) {
          originCollider.collisions[target.id] = false;
        }
      },
      ({ origin, target }) => {
        const originCollider = origin.component<Collider>(Collider);
        delete originCollider.collisions[target.id];
      }
    );

    // NOTE check if this clean up affects performance
    const collider = entity.component<Collider>(Collider);
    Object.keys(collider.collisions).forEach((id) => {
      if (!PhysicsWorld.has(id)) {
        delete collider.collisions[id];
      }
    });
  }
}
