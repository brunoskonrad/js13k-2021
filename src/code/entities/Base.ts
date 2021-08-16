import { Component } from "../components/Base";

type SearchByName<T extends Component> = T | undefined;

let entities = 0;

export class Entity {
  components: { [key: string]: Component } = {};
  entityNumber: Number;

  constructor() {
    this.entityNumber = entities++;
  }

  component<T extends Component>(name: string): SearchByName<T> {
    return this.components[name] as SearchByName<T>;
  }

  addComponent(c: Component) {
    this.components[c.name] = c;
  }

  get id(): string {
    return `${this.constructor.name}_${this.entityNumber}`;
  }
}
