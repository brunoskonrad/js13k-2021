import { Collider } from "./components/Collider";
import { Position } from "./components/Position";
import { Size } from "./components/Size";
import { Entities } from "./Entities";
import { Entity } from "./entities/Base";

type CollidableEntity = {
  position: {
    x: number;
    y: number;
  };
  width: number;
  height: number;
};

function doesCollide(rect1: CollidableEntity, rect2: CollidableEntity) {
  return (
    rect1.position.x < rect2.position.x + rect2.width &&
    rect1.position.x + rect1.width > rect2.position.x &&
    rect1.position.y < rect2.position.y + rect2.height &&
    rect1.position.y + rect1.height > rect2.position.y
  );
}

type Collision = {
  anchor: string;
  target: string;
};

class Layer {}

type Layers = { [key: number]: number[] };
type PhysicsLayers = { [key: number]: { [key: string]: boolean } };

export class PhysicsWorld {
  static rules: Layers = {
    1: [3, 4, 5],
    2: [3],
    3: [1, 4, 5],
    4: [1, 2, 3],
    5: [],
  };
  static layers: PhysicsLayers = {
    1: {},
    2: {},
    3: {},
    4: {},
    5: {},
  };

  static push(id: string, layer: number) {
    this.layers[layer] ??= {};

    this.layers[layer][id] = true;
  }

  static pop(id: string, layer: number) {
    delete this.layers[layer][id];
  }

  static detectCollisionFor(
    entity: Entity,
    didCollide: (collision: { origin: Entity; target: Entity }) => void,
    didNotCollide: (collision: { origin: Entity; target: Entity }) => void
  ) {
    const { layer } = entity.component<Collider>(Collider.name);
    const ogCollider = createCollidableEntity(entity);

    const rules = this.rules[layer];
    rules.forEach((collidableLayer) => {
      const entitiesId = Object.keys(this.layers[collidableLayer]);

      entitiesId.forEach((id) => {
        const candidateForCollision = Entities.get(id);
        const other = createCollidableEntity(candidateForCollision);

        if (doesCollide(ogCollider, other)) {
          didCollide({
            origin: entity,
            target: candidateForCollision,
          });
        } else {
          didNotCollide({
            origin: entity,
            target: candidateForCollision,
          });
        }
      });
    });
  }

  static has(id: string): boolean {
    return Object.entries(this.layers).reduce<boolean>((acc, value) => {
      const [_layer, entities] = value;

      if (acc) {
        return acc;
      }

      return Object.keys(entities).includes(id);
    }, false);
  }

  static get count() {
    return Object.entries(this.layers).reduce((acc, value) => {
      const [_layer, entities] = value;

      return Object.keys(entities).length + acc;
    }, 0);
  }
}

function createCollidableEntity(entity: Entity): CollidableEntity {
  const { width, height } = entity.component<Size>(Size.name);
  const position = entity.component<Position>(Position.name);

  return {
    position,
    height,
    width,
  };
}
