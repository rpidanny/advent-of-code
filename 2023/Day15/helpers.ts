export interface Lens {
  label: string;
  f: number;
}

export interface HashMapOpts {
  label: string;
  operation: string;
  f?: number;
}

export function parseInput(inputs: string[]): string[] {
  return inputs.flatMap((curr) => curr.split(","));
}

export function calculateHash(str: string): number {
  let hash = 0;
  for (const char of str) {
    hash = ((hash + char.charCodeAt(0)) * 17) % 256;
  }
  return hash;
}

export class LightGuide {
  boxes: Lens[][];

  constructor() {
    this.boxes = Array.from({ length: 256 }, () => []);
  }

  parseStep(input: string): HashMapOpts {
    const [label] = input.split("-");
    if (label !== input) {
      return { label, operation: "-" };
    }

    const [label2, f] = input.split("=");
    return { label: label2, operation: "=", f: parseInt(f, 10) };
  }

  // Holiday ASCII String Helper Manual Arrangement Procedure
  hashMap(step: string): void {
    const { label, operation, f } = this.parseStep(step);
    const boxIdx = calculateHash(label);
    const box = this.boxes[boxIdx];

    const lensIdx = box.findIndex((lens) => lens.label === label);

    if (operation === "-") {
      if (lensIdx >= 0) {
        box.splice(lensIdx, 1);
      }
    } else if (operation === "=") {
      if (lensIdx >= 0) {
        box[lensIdx].f = f;
      } else {
        box.push({ label, f });
      }
    }
  }

  // Lens Focusing Power Sum
  lensFocusingPowerSum(): number {
    let focusingPower = 0;

    for (let i = 0; i < this.boxes.length; i++) {
      const box = this.boxes[i];
      if (box.length) {
        for (let j = 0; j < box.length; j++) {
          const lens = box[j];
          focusingPower += (i + 1) * (j + 1) * lens.f;
        }
      }
    }

    return focusingPower;
  }
}
