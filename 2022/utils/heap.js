class Heap {
  constructor(items, comparator) {
    this.arr = [];
    this.comparator = comparator;

    for (const val of items) {
      this.addItem(val);
    }
  }

  getParent(i) {
    return (i - 1) >> 1;
  }

  getRightChild(i) {
    return (i << 1) + 2;
  }

  getLeftChild(i) {
    return (i << 1) + 1;
  }

  swap(i, j) {
    // console.log(`Swapping: ${i} to ${j}`);
    [this.arr[i], this.arr[j]] = [this.arr[j], this.arr[i]];
  }

  bubbleUp(i) {
    let pointer = i;

    while (true) {
      const parentIdx = this.getParent(pointer);
      if (
        pointer <= 0 ||
        this.comparator(this.arr[pointer], this.arr[parentIdx])
      ) break;

      this.swap(pointer, parentIdx);
      pointer = parentIdx;
    }
  }

  bubbleDown(i) {
    let pointer = i;

    while (true) {
      const leftChild = this.getLeftChild(pointer);
      const rightChild = this.getRightChild(pointer);
      let swapIndex = pointer;

      if (this.comparator(this.arr[swapIndex], this.arr[leftChild])) {
        swapIndex = leftChild;
      }
      if (this.comparator(this.arr[swapIndex], this.arr[rightChild])) {
        swapIndex = rightChild;
      }

      if (swapIndex === pointer) break;

      this.swap(pointer, swapIndex);
      pointer = swapIndex;
    }
  }

  addItem(val) {
    this.arr.push(val);
    this.bubbleUp(this.arr.length - 1);
  }

  popTop() {
    this.swap(0, this.arr.length - 1);
    const top = this.arr.pop();
    this.bubbleDown(0);
    return top;
  }

  peekEnd() {
    return this.arr[this.arr.length - 1];
  }

  peekTop() {
    return this.arr[0];
  }
}

// const maxHeap = new Heap([2, 3, 4, 1, 6, 7, 5], (a, b) => a < b);

// console.log(maxHeap);

// console.log(maxHeap.popTop());
// console.log(maxHeap.arr);
// console.log(maxHeap.popTop());
// console.log(maxHeap.arr);

module.exports = {
  Heap,
};
