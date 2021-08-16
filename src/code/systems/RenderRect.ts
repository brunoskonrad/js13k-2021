import { System } from "./Base";
import { Entity } from "../entities/Base";

import { canvas } from "../Canvas";
import { Position } from "../components/Position";
import { Size } from "../components/Size";

export class RenderRect extends System {
  constructor() {
    super(["Position", "Size", "Rect"]);
  }

  execute(entity: Entity) {
    const position = entity.component<Position>("Position");
    const size = entity.component<Size>("Size");
    
    canvas.context.rect(position.x, position.y, size.width, size.height);
    canvas.context.fill();
  }
}
