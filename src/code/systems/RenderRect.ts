import { System } from "./Base";
import { Entity } from "../entities/Base";

import { canvas } from "../Canvas";
import { Position } from "../components/Position";
import { Size } from "../components/Size";
import { Rect } from "../components/Rect";

export class RenderRect extends System {
  components = [Position, Size, Rect];

  execute(entity: Entity) {
    const position = entity.component<Position>(Position);
    const size = entity.component<Size>(Size);
    const rect = entity.component<Rect>(Rect);

    canvas.context.save();

    canvas.context.fillStyle = rect.color;
    canvas.context.fillRect(position.x, position.y, size.width, size.height);

    canvas.context.restore();
  }
}
