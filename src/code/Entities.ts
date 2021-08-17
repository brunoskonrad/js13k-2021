import { Entity } from "./entities/Base";
import { emitter } from "./EventEmitter";

export class Entities {
  // Object to store entities
  private static o: { [key: string]: Entity } = {};

  static get(id: string): Entity | undefined {
    return this.o[id];
  }

  static push(entity: Entity) {
    this.o[entity.id] = entity;

    emitter.emit("_e:push", entity);
  }

  static pop(entity: Entity) {
    if (!!this.o[entity.id]) {
      emitter.emit("_e:pop", entity);
    }

    delete this.o[entity.id];
  }

  static forEach(callback: (entity: Entity) => void) {
    Object.keys(this.o).forEach((key) => {
      callback(this.o[key]);
    });
  }

  static get count(): number {
    return Object.keys(this.o).length;
  }
}

(window as any).Entities = Entities;
