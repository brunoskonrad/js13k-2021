import { Entity } from "../entities/Base";

export class System {
  components: Function[] = [];

  process(entity: Entity, dt: number) {
    if (this.valid(entity)) {
      this.execute(entity, dt);
    }
  }

  execute(_entity: Entity, _dt: number) {}

  private valid(entity: Entity) {
    const components = this.components.filter((c) => !!entity.c[c.name]);

    return components.length === this.components.length;
  }
}
