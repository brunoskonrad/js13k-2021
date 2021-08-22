import { Health } from "../components/Health";
import { Entities } from "../Entities";
import { Entity } from "../entities/Base";
import { System } from "./Base";

export class CheckHealthSituation extends System {
  components = [Health];

  execute(entity: Entity) {
    const health = entity.component<Health>(Health);

    if (health.value <= 0) {
      // play death animation
      Entities.pop(entity);
    }
  }
}
