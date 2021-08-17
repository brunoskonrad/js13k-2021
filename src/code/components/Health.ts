import { Component } from "./Base";

export class Health extends Component {
  value: number;

  constructor(value: number) {
    super();

    this.value = value;
  }
}
