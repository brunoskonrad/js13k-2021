import { Component } from "../components/Base";

type SearchByName<T extends Component> = T | undefined;

export class Entity {
  components: { [key: string]: Component } = {};

  component<T extends Component>(name: string): SearchByName<T> {
    return this.components[name] as SearchByName<T>;
  }

  addComponent(c: Component) {
    this.components[c.name] = c;
  }
}
