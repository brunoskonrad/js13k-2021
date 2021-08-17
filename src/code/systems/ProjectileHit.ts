import { Collider } from "../components/Collider";
import { Health } from "../components/Health";
import { Projectile } from "../components/Projectile";
import { Entities } from "../Entities";
import { Entity } from "../entities/Base";
import { System } from "./Base";

export class ProjectileHit extends System {
  components = [Collider.name, Projectile.name];

  execute(entity: Entity) {
    const collider = entity.component<Collider>(Collider.name);
    const projectile = entity.component<Projectile>(Projectile.name);
    const collidedObjects = Object.keys(collider.collisions);

    if (collidedObjects.length > 0) {
      collidedObjects.forEach((id) => {
        if (collider.collisions[id]) {
          return;
        }

        collider.collisions[id] = true;
        damage(Entities.get(id), projectile.damage);

        Entities.pop(entity);
      });
    }
  }
}

function damage(entity: Entity, hitDamage: number) {
  const health = entity.component<Health>(Health.name);

  if (health) {
    health.value -= hitDamage;
  }
}
