class Operation {
  constructor(type, val) {
    this.type = type;
    this.val = isNaN(val) ? undefined : val;
  }

  execute(num) {
    const operator = this.val || num;

    if (this.type === "+") {
      return num + operator;
    } else if (this.type === "*") {
      return num * operator;
    }
  }
}

module.exports = {
  Operation,
};
