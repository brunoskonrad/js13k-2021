import { Component } from "../components/Base";

type SearchByName<T extends Component> = T | undefined;

let entities = 0;

export class Entity {
  c: { [key: string]: Component } = {};
  id: string;

  constructor(components: Component[]) {
    this.id = `${this.constructor.name}_${entities++}`;

    components.forEach((component) => this.a(component));
  }

  component<T extends Component>(component: Function): SearchByName<T> {
    return this.c[component.name] as SearchByName<T>;
  }

  /**
   * Add a new component to the entity
   */
  a(component: Component) {
    this.c[component.constructor.name] = component;
  }
}
