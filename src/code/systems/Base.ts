import { Entity } from "../entities/Base";

export class System {
  components: string[] = [];

  process(entity: Entity, dt: number) {
    if (this.valid(entity)) {
      this.execute(entity, dt);
    }
  }

  execute(_entity: Entity, _dt: number) {
    throw "Implement me";
  }

  private valid(entity: Entity) {
    const components = this.components.filter((c) => !!entity.components[c]);

    return components.length === this.components.length;
  }
}
