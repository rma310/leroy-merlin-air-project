type Listener<T> = (items: T[]) => void;

/**
 * generic state
 */
export class State<T> {
  /**
   * list of data listeners for a given data type
   */
  protected listeners: Listener<T>[] = [];

  constructor(public data: T[]) {}

  get initData() {
    return this.data;
  }

  /**
   * registers a data listener
   * @param listenerFn 
   */
  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }

  /**
   * notifies subscribers of data changes
   */
  protected updateListeners() {
    for (const listenerFn of this.listeners) {
      listenerFn([...this.data]);
    }
  }
}
