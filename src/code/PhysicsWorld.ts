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

type Layers = {[key: number]: number[]};
type PhysicsLayers = { [key: number]: string[] };

export class PhysicsWorld {
  static rules: Layers = {
    1: [3, 4, 5],
    2: [],
    3: [1, 2, 4, 5],
    4: [1, 2, 3],
    5: [],
  };
  static layers: PhysicsLayers = {};

  static push(id: string, layer: number) {
    if (!!this.layers[layer]) {
      this.layers[layer] = [];
    }
  }
}
