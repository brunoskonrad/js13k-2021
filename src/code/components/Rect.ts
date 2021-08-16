import { Component } from "./Base";

export class Rect extends Component {
  color: string;

  constructor(color: string = "#000") {
    super();
    this.color = color;
  }
}
