import { leastCommonMultiple } from "../utils/math";
import {
  BroadcastModule,
  ConjunctionModule,
  FlipFlopModule,
  Module,
} from "./module";

interface QueueItem {
  origin: string;
  target: string;
  pulse: boolean;
}

export class Circuit {
  modules: Map<string, Module>;
  adjList: Map<string, string[]>;

  constructor(input: string[]) {
    this.modules = new Map<string, Module>();
    this.adjList = new Map<string, string[]>();

    this.parseInput(input);
  }

  private parseInput(input: string[]) {
    for (const line of input) {
      const [left, right] = line.split(" -> ");
      const [srcType, src] = this.extractPrefix(left);
      const destArr = right.split(", ");

      if (src === "broadcaster") {
        this.modules.set(src, new BroadcastModule(src));
      } else if (srcType === "%") {
        this.modules.set(src, new FlipFlopModule(src));
      } else if (srcType === "&") {
        this.modules.set(src, new ConjunctionModule(src));
      }

      this.adjList.set(src, destArr);
    }

    this.updateOriginPulses();
  }

  private extractPrefix(str: string) {
    const match = str.match(/^([%&])?(.+)$/);

    if (match) {
      const [, prefix, rest] = match;
      return [prefix, rest];
    }
  }

  private updateOriginPulses() {
    for (const [name, neighbors] of this.adjList.entries()) {
      for (const neighbor of neighbors) {
        const neighborModule = this.modules.get(neighbor);

        if (neighborModule) {
          neighborModule.setOriginPulse(name, false);
        }
      }
    }
  }

  private getParentNodes(name: string): string[] {
    return Array.from(this.adjList.entries())
      .filter(([, value]) => value.includes(name))
      .map(([key]) => key);
  }

  private pressButton(): { high: number; low: number } {
    let high = 0;
    let low = 0;

    const queue: QueueItem[] = [
      { origin: "button", target: "broadcaster", pulse: false },
    ];

    while (queue.length) {
      const { origin, target, pulse } = queue.shift();

      if (pulse) high++;
      else low++;

      if (!this.modules.has(target)) continue;

      const module = this.modules.get(target);

      if (target === "gf" && pulse) {
        console.log(`${origin} is high going into gf`);
      }

      const neighbors = this.adjList.get(target);

      const output = module?.setPulse(origin, pulse);

      // flip-flops might not output anything
      if (output === undefined) continue;

      for (const neighbor of neighbors || []) {
        queue.push({
          origin: target,
          target: neighbor,
          pulse: output,
        });
      }
    }

    return { high, low };
  }

  public getProductOfHighLowCount(iterations = 1_000): number {
    let highCount = 0;
    let lowCount = 0;

    for (let i = 0; i < iterations; i++) {
      const { high, low } = this.pressButton();
      highCount += high;
      lowCount += low;
    }

    return highCount * lowCount;
  }

  public numOfBtnPressesUntilLowPulse(module = "rx"): number {
    const feed = this.getParentNodes(module)[0];

    const seen = new Set<string>();
    const cycles = new Map<string, number>();

    let btnPresses = 0;
    while (true) {
      btnPresses++;

      const queue: QueueItem[] = [
        { origin: "button", target: "broadcaster", pulse: false },
      ];

      while (queue.length) {
        const { origin, target, pulse } = queue.shift();

        if (!this.modules.has(target)) continue;

        const module = this.modules.get(target);

        if (target === feed && pulse) {
          seen.add(origin);
          if (!cycles.has(origin)) {
            cycles.set(origin, btnPresses);
          }

          if (seen.size === module?.originPulses.size) {
            return leastCommonMultiple(Array.from(cycles.values()));
          }
        }

        const output = module?.setPulse(origin, pulse);
        // flip-flops might not output anything
        if (output === undefined) continue;

        for (const neighbor of this.adjList.get(target) || []) {
          queue.push({
            origin: target,
            target: neighbor,
            pulse: output,
          });
        }
      }
    }
  }
}
