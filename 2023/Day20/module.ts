export enum ModuleType {
  FlipFlop = "FlipFlop",
  Conjunction = "Conjunction",
  Broadcast = "Broadcast",
}

export interface Module {
  name: string;
  type: ModuleType;
  originPulses: Map<string, boolean>;
  state: boolean;

  setOriginPulse(origin: string, pulse: boolean): void;
  setPulse(origin: string, pulse: boolean): boolean | undefined;
}

export class FlipFlopModule implements Module {
  type = ModuleType.FlipFlop;
  state = false;

  constructor(
    public name: string,
    public originPulses: Map<string, boolean> = new Map(),
  ) {}

  setOriginPulse(origin: string, state: boolean): void {
    this.originPulses.set(origin, state);
  }

  setPulse(origin: string, pulse: boolean): boolean | undefined {
    // flipflop only reacts to low pulse i.e. false
    if (pulse) return;

    this.state = !this.state;
    return this.state;
  }
}

export class ConjunctionModule implements Module {
  type = ModuleType.Conjunction;
  state = false;

  constructor(
    public name: string,
    public originPulses: Map<string, boolean> = new Map(),
  ) {}

  setOriginPulse(origin: string, state: boolean): void {
    this.originPulses.set(origin, state);
  }

  setPulse(origin: string, pulse: boolean): boolean {
    this.setOriginPulse(origin, pulse);

    this.state = !Array.from(this.originPulses.values()).every(
      (input) => input,
    );
    return this.state;
  }
}

export class BroadcastModule implements Module {
  type = ModuleType.Broadcast;
  state = false;

  constructor(
    public name: string,
    public originPulses: Map<string, boolean> = new Map(),
  ) {}

  setOriginPulse(origin: string, state: boolean): void {
    this.originPulses.set(origin, state);
  }

  setPulse(origin: string, pulse: boolean): boolean {
    this.state = pulse;
    return this.state;
  }
}
