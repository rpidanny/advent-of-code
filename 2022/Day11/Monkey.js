class Monkey {
  inspectionCount = 0;

  constructor(id, items, operation, throwTest) {
    this.id = id;
    this.items = items;
    this.operation = operation;
    this.throwTest = throwTest;
  }

  getItemsCount() {
    return this.items.length;
  }

  getInspectionsCount() {
    return this.inspectionCount;
  }

  inspect(item) {
    this.inspectionCount++;
    return this.operation.execute(item);
  }

  throwItem(lcmOfDivisors, isRelief = true) {
    const item = this.items.pop();

    let wLevel = this.inspect(item);

    if (isRelief) wLevel = Math.floor(wLevel / 3);

    if (lcmOfDivisors) wLevel %= lcmOfDivisors;

    return this.throwTest.execute(wLevel);
  }

  catchItem(item) {
    this.items.unshift(item);
  }
}

module.exports = {
  Monkey,
};
