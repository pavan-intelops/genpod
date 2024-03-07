type ListenerFunction = (...args: unknown[]) => void;

class EventEmitter {
  private events: Map<string, ListenerFunction[]>;
  private debouncedEvents: Map<string, ListenerFunction>;
  private debounceTimers: Map<string, ReturnType<typeof setTimeout>>;

  constructor() {
    this.events = new Map();
    this.debouncedEvents = new Map();
    this.debounceTimers = new Map();
  }

  addListener(event: string, fn: ListenerFunction): EventEmitter {
    const listeners = this.events.get(event) || [];
    listeners.push(fn);
    this.events.set(event, listeners);
    return this;
  }

  addDebounceListener(event: string, fn: ListenerFunction, delay: number) {
    // Clear any existing timer and listener for this event.
    const debouncedFn = (...args: unknown[]) => {
      clearTimeout(this.debounceTimers.get(event));
      const timer = setTimeout(() => {
        fn(...args);
      }, delay);
      this.debounceTimers.set(event, timer);
    };
    this.removeDebouncedEvent(event);

    this.debouncedEvents.set(event, debouncedFn);
  }

  removeListener(event: string, fn?: ListenerFunction): void {
    if (fn) {
      const listeners = this.events.get(event);
      if (listeners) {
        const index = listeners.indexOf(fn);
        if (index > -1) {
          listeners.splice(index, 1);
        }
      }
    } else {
      this.events.delete(event);
    }

    this.removeDebouncedEvent(event);
  }

  emit(event: string, ...args: unknown[]): void {
    const listeners = this.events.get(event);
    if (listeners) {
      listeners.forEach(listener => listener(...args));
      return;
    }
    const debouncedListener = this.debouncedEvents.get(event);
    if (debouncedListener) {
      debouncedListener(...args);
    }
  }

  on(event: string, fn: ListenerFunction): EventEmitter {
    return this.addListener(event, fn);
  }

  off(event: string, fn?: ListenerFunction) {
    this.removeListener(event, fn);
  }

  once(event: string, fn: ListenerFunction): EventEmitter {
    const onceFn: ListenerFunction = (...args) => {
      fn(...args);
      this.off(event, onceFn);
    };
    this.on(event, onceFn);
    return this;
  }

  listenerCount(event: string): number {
    const normalListenersCount = this.events.get(event)?.length || 0;
    const hasDebouncedListener = this.debouncedEvents.has(event) ? 1 : 0;
    return normalListenersCount + hasDebouncedListener;
  }

  rawListeners(event: string): ListenerFunction[] {
    const listeners = this.events.get(event) || [];
    const debouncedListener = this.debouncedEvents.get(event);
    return debouncedListener ? [...listeners, debouncedListener] : listeners;
  }

  private removeDebouncedEvent(event: string): void {
    if (this.debouncedEvents.has(event)) {
      const timer = this.debounceTimers.get(event);
      if (timer) {
        clearTimeout(timer);
      }
      this.debouncedEvents.delete(event);
      this.debounceTimers.delete(event);
    }
  }

  // Removes all listeners
  destroy(): void {
    this.events.clear();
    this.debouncedEvents.clear();
    this.debounceTimers.forEach(timer => clearTimeout(timer));
    this.debounceTimers.clear();
  }

  // Removes all listeners for the specified event
  removeAllListeners(event: string): void {
    this.events.delete(event);
    this.removeDebouncedEvent(event);
  }
}

export const emitter = new EventEmitter();
