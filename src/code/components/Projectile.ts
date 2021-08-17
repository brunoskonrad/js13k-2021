import { Component } from "./Base";

export class Projectile extends Component {
  damage: number = 0;

  constructor(damage: number) {
    super();

    this.damage = damage;
  }
}
