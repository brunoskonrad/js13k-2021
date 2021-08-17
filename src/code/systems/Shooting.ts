import { Direction } from "../components/Direction";
import { Position } from "../components/Position";
import { Shooter } from "../components/Shooter";
import { Entities } from "../Entities";
import { Entity } from "../entities/Base";
import { Bullet } from "../entities/Bullet";
import { Input } from "../Input";
import { vec2 } from "../Vector2";
import { System } from "./Base";

export class Shooting extends System {
  conmponents = [Shooter.name, Position.name, Direction.name];

  execute(entity: Entity) {
    if (Input.isActionPressed("shoot")) {
      this.shoot(entity);
    }
  }

  shoot: (entity: Entity) => void = throttle((entity: Entity) => {
    const playerPosition = entity.component<Position>(Position.name);
    const shooter = entity.component<Shooter>(Shooter.name);
    const direction = entity.component<Direction>(Direction.name);

    const initialPosition = vec2(
      playerPosition.x + shooter.position.x,
      playerPosition.y + shooter.position.y
    );

    const bullet = new Bullet(initialPosition, direction.value);

    Entities.push(bullet);
  });
}

function throttle(callback) {
  var waiting = false; // Initially, we're not waiting
  return function (entity: Entity) {
    const shooter = entity.component<Shooter>(Shooter.name);

    // We return a throttled function
    if (!waiting) {
      // If we're not waiting
      callback(entity); // Execute users function
      waiting = true; // Prevent future invocations
      setTimeout(function () {
        // After a period of time
        waiting = false; // And allow future invocations
      }, shooter.delay);
    }
  };
}
