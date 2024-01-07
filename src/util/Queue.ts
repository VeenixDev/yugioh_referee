export default class Queue<T> {
  head: number;
  tail: number;
  data: { [k: number]: T };

  constructor() {
    this.head = 0;
    this.tail = 0;
    this.data = new Array();
  }

  public enqueue(element: T): void {
    this.data[this.tail++] = element;
  }

  public dequeue(): T {
    const item = this.data[this.head];
    delete this.data[this.head++];
    return item;
  }

  public peek(): T {
    return this.data[this.head];
  }

  public get length() {
    return this.tail - this.head;
  }

  public get isEmpty() {
    return this.length === 0;
  }
}
