/**
 * _e = entities
 */
type GameEvent = "_e:push" | "_e:pop";

class EventEmitter {
  on<T>(event: GameEvent, callback: (data: T) => void) {
    document.addEventListener(event, (event) => {
      callback((event as any).detail as T);
    });
  }

  emit<T>(event: GameEvent, data: T) {
    document.dispatchEvent(new CustomEvent(event, { detail: data }));
  }
}

export const emitter = new EventEmitter();
