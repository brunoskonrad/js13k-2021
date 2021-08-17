import { Entity } from "./entities/Base";

export class Entities {
  private static objects: { [key: string]: Entity } = {};

  static get(id: string): Entity | undefined {
    return this.objects[id];
  }

  static push(entity: Entity) {
    this.objects[entity.id] = entity;

    document.dispatchEvent(
      new CustomEvent("entities:push", { detail: entity })
    );
  }

  static pop(entity: Entity) {
    if (!!this.objects[entity.id]) {
      document.dispatchEvent(
        new CustomEvent("entities:pop", { detail: entity })
      );
    }

    delete this.objects[entity.id];
  }

  static forEach(callback: (entity: Entity) => void) {
    Object.keys(this.objects).forEach((key) => {
      callback(this.objects[key]);
    });
  }

  static get count(): number {
    return Object.keys(this.objects).length;
  }
}

(window as any).Entities = Entities;
