export interface IItem {
  weight: number;
  data?: any;
}

export interface IComparator {
  (val1: number, val2: number): number;
}

export class Heap {
  items: IItem[];
  comparator: IComparator;

  constructor(comparator: IComparator) {
    this.items = [];
    this.comparator = comparator;
  }

  private swap(idx1: number, idx2: number) {
    [this.items[idx1], this.items[idx2]] = [this.items[idx2], this.items[idx1]];
  }

  private getParent(idx: number): number {
    return (idx - 1) >> 1;
  }

  private getChildren(idx: number): { leftChild: number; rightChild: number } {
    return {
      leftChild: idx * 2 + 1,
      rightChild: idx * 2 + 2,
    };
  }

  private shouldSwap(idx1: number, idx2: number): boolean {
    return (
      this.comparator(this.items[idx1].weight, this.items[idx2].weight) < 0
    );
  }

  private bubbleUp(idx: number) {
    let current = idx;

    while (current > 0) {
      const parent = this.getParent(current);

      if (this.shouldSwap(current, parent)) {
        this.swap(current, parent);
      }

      current = parent;
    }
  }

  private bubbleDown(idx: number) {
    let current = idx;

    while (current < this.items.length - 1) {
      const { leftChild, rightChild } = this.getChildren(current);

      let swapIndex = current;

      if (this.items[leftChild] && this.shouldSwap(leftChild, swapIndex)) {
        swapIndex = leftChild;
      }

      if (this.items[rightChild] && this.shouldSwap(rightChild, swapIndex)) {
        swapIndex = rightChild;
      }

      if (swapIndex === current) break;

      this.swap(current, swapIndex);
      current = swapIndex;
    }
  }

  get length() {
    return this.items.length;
  }

  public add(item: IItem) {
    this.items.push(item);

    this.bubbleUp(this.items.length - 1);
  }

  public pop(): IItem | undefined {
    if (!this.items.length) return;

    this.swap(0, this.items.length - 1);
    const item = this.items.pop();
    this.bubbleDown(0);

    return item;
  }
}
