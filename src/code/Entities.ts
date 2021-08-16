import { Entity } from "./entities/Base";

export class Entities {
  private static objects: { [key: string]: Entity } = {};

  static push(entity: Entity) {
    this.objects[entity.id] = entity;
  }

  static pop(entity: Entity) {
    delete this.objects[entity.id];
  }

  static forEach(callback: (entity: Entity) => void) {
    Object.keys(this.objects).forEach((key) => {
      callback(this.objects[key]);
    });
  }
}
