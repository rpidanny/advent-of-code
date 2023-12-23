type Variable = "x" | "m" | "a" | "s";

interface Rule {
  variable: Variable;
  operator: string;
  value: number;
  destination: string;
}

interface Part {
  x: number;
  m: number;
  a: number;
  s: number;
}

interface Workflow {
  rules: Rule[];
  fallback: string;
}

export class XmasWorkflow {
  workflows: Map<string, Workflow>;
  parts: Part[];

  constructor(inputs: string[]) {
    this.workflows = new Map();
    this.parts = [];

    this.parseInputs(inputs);
  }

  private parseInputs(inputs: string[]) {
    let parsePart = false;

    for (const line of inputs) {
      if (line === "") {
        parsePart = true;
        continue;
      }

      parsePart ? this.parsePart(line) : this.parseWorkflow(line);
    }
  }

  private parseWorkflow(line: string) {
    const [name, rest] = line.split("{");

    const rules: Rule[] = [];
    let fallback: string;

    rest
      .slice(0, -1)
      .split(",")
      .forEach((rule) => {
        rule.includes(":")
          ? rules.push(this.parseRule(rule))
          : (fallback = rule);
      });

    this.workflows.set(name, { rules, fallback });
  }

  private parseRule(ruleStr: string): Rule {
    const [variable, operator, value, destination] = ruleStr.match(
      /([a-z]+|[<>]=?|\d+|[A-Z])/gi,
    )!;
    return {
      variable: variable as Variable,
      operator,
      value: parseInt(value),
      destination,
    };
  }

  private parsePart(line: string) {
    const [x, m, a, s] = line
      .substring(1, line.length - 1)
      .split(",")
      .map((val) => parseInt(val.split("=")[1]));

    this.parts.push({ x, m, a, s });
  }

  private evaluateCondition(rule: Rule, part: Part): boolean {
    const { variable, operator, value } = rule;

    switch (operator) {
      case "<":
        return part[variable] < value;
      case ">":
        return part[variable] > value;
    }
  }

  private processPart(workflow: string, part: Part): boolean {
    while (this.workflows.has(workflow)) {
      const { rules, fallback } = this.workflows.get(workflow)!;

      const matchingRule = rules.find((rule) =>
        this.evaluateCondition(rule, part),
      );

      if (matchingRule) {
        workflow = matchingRule.destination;
      } else {
        workflow = fallback;
      }
    }

    return workflow === "A";
  }

  public sumOfAcceptedRatings(workflowName: string): number {
    return this.parts
      .filter((part) => this.processPart(workflowName, part))
      .reduce((acc, part) => acc + part.x + part.m + part.a + part.s, 0);
  }

  public getTotalPossibleAcceptedParts(
    workflowName: string,
    range: Map<Variable, [number, number]> = new Map([
      ["x", [1, 4_000]],
      ["m", [1, 4_000]],
      ["a", [1, 4_000]],
      ["s", [1, 4_000]],
    ]),
  ): number {
    if (workflowName === "R") return 0;
    if (workflowName === "A") {
      return Array.from(range.values()).reduce(
        (acc, [min, max]) => acc * (max - min + 1),
        1,
      );
    }

    const { rules, fallback } = this.workflows.get(workflowName)!;

    let total = 0;

    for (const { variable, operator, value, destination } of rules) {
      const [min, max] = range.get(variable)!;

      let valid: [number, number];
      let invalid: [number, number];

      switch (operator) {
        case "<":
          valid = [min, Math.min(max, value - 1)];
          invalid = [Math.min(max, value), max];
          break;
        case ">":
          valid = [Math.max(min, value + 1), max];
          invalid = [min, Math.max(min, value)];
          break;
      }

      if (valid[0] <= valid[1]) {
        const newRange = new Map(range);
        newRange.set(variable, valid);
        total += this.getTotalPossibleAcceptedParts(destination, newRange);
      }

      // need to update the invalid range for the next rule / fallback
      if (invalid[0] <= invalid[1]) {
        range.set(variable, invalid);
      }
    }

    total += this.getTotalPossibleAcceptedParts(fallback, new Map(range));

    return total;
  }
}
