import { Component } from "../components/Base";

type SearchByName<T extends Component> = T | undefined;

let entities = 0;

export class Entity {
  c: { [key: string]: Component } = {};
  num: Number;

  constructor() {
    this.num = entities++;
  }

  component<T extends Component>(name: string): SearchByName<T> {
    return this.c[name] as SearchByName<T>;
  }

  add(c: Component) {
    this.c[c.constructor.name] = c;
  }

  get id(): string {
    return `${this.constructor.name}_${this.num}`;
  }
}
