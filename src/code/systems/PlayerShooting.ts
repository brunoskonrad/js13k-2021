import { Position } from "../components/Position";
import { Size } from "../components/Size";
import { Entities } from "../Entities";
import { Entity } from "../entities/Base";
import { Bullet } from "../entities/Bullet";
import { Input } from "../Input";
import { vec2 } from "../Vector2";
import { System } from "./Base";

export class PlayerShooting extends System {
  constructor() {
    super(["Shooter", "Position", "Size"])
  }

  execute(entity: Entity) {
    if (Input.isActionPressed("shoot")) {
      const playerPosition = entity.component<Position>("Position");
      const playerSize = entity.component<Size>("Size");
  
      const initialPosition = vec2(
        playerPosition.x + playerSize.width + 1,
        playerSize.height / 2 + playerPosition.y - 1.5
      );
  
      const bullet = new Bullet(initialPosition, vec2(1, 0));
  
      Entities.push(bullet);
    }
  }
}
