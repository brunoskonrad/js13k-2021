import { Position } from "../components/Position";
import { Shooter } from "../components/Shooter";
import { Entities } from "../Entities";
import { Entity } from "../entities/Base";
import { Bullet } from "../entities/Bullet";
import { Input } from "../Input";
import { vec2 } from "../Vector2";
import { System } from "./Base";

export class Shooting extends System {
  constructor() {
    super(["Shooter", "Position"])
  }

  execute(entity: Entity) {
    if (Input.isActionPressed("shoot")) {
      const playerPosition = entity.component<Position>("Position");
      const shooter = entity.component<Shooter>("Shooter")
  
      const initialPosition = vec2(
        playerPosition.x + shooter.position.x,
        playerPosition.y + shooter.position.y,
      );
  
      const bullet = new Bullet(initialPosition, vec2(1, 0));
  
      Entities.push(bullet);
    }
  }
}
