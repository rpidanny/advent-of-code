export function parseInput(inputs: string[]): string[][] {
  return inputs.map((input) => input.split(""));
}

export enum Direction {
  North = "N",
  East = "E",
  South = "S",
  West = "W",
}

export class Platform {
  constructor(private grid: string[][]) {}

  public get width(): number {
    return this.grid[0].length;
  }

  public get height(): number {
    return this.grid.length;
  }

  public get(x: number, y: number): string {
    return this.grid[y][x];
  }

  public set(x: number, y: number, value: string): void {
    this.grid[y][x] = value;
  }

  public toString(): string {
    return this.grid.map((row) => row.join("")).join("\n");
  }

  public print(): void {
    console.log(this.toString());
  }

  public tilt(direction: Direction): string[][] {
    switch (direction) {
      case Direction.North:
        this.tiltNorth();
        break;
      case Direction.East:
        this.tiltEast();
        break;
      case Direction.South:
        this.tiltSouth();
        break;
      case Direction.West:
        this.tiltWest();
        break;
    }
    return this.grid;
  }

  public getTotalLoad(direction: Direction): number {
    switch (direction) {
      case Direction.North:
        return this.getTotalLoadNorth();
      case Direction.East:
        return this.getTotalLoadEast();
      case Direction.South:
        return this.getTotalLoadSouth();
      case Direction.West:
        return this.getTotalLoadWest();
    }
  }

  public spinCycle(count: number): void {
    const map = new Map<string, number>();
    let lengthOfCycle = 0;

    for (let i = 0; i < count; i++) {
      this.spin();

      const key = this.toString();
      if (!map.has(key)) {
        map.set(key, i);
        continue;
      }

      if (!lengthOfCycle) {
        lengthOfCycle = map.get(key) - map.size;
      }

      if (count % lengthOfCycle === (i + 1) % lengthOfCycle) {
        break;
      }
    }
  }

  private spin(): void {
    this.tiltNorth();
    this.tiltWest();
    this.tiltSouth();
    this.tiltEast();
  }

  private tiltNorth(): void {
    for (let x = 0; x < this.width; x++) {
      let y = this.height - 1;
      while (y >= 0) {
        let storeCount = 0;
        // count the number of rounded rock until we hit a cubed rock
        while (y >= 0 && this.get(x, y) !== "#") {
          if (this.get(x, y) === "O") {
            storeCount++;
            this.set(x, y, ".");
          }
          y--;
        }

        // move the rounded rocks towards the bottom
        for (let i = 0; i < storeCount; i++) {
          this.set(x, y + 1 + i, "O");
        }
        y--;
      }
    }
  }

  private tiltSouth(): void {
    for (let x = 0; x < this.width; x++) {
      let y = 0;
      while (y < this.height) {
        let storeCount = 0;
        // count the number of rounded rock until we hit a cubed rock
        while (y < this.height && this.get(x, y) !== "#") {
          if (this.get(x, y) === "O") {
            storeCount++;
            this.set(x, y, ".");
          }
          y++;
        }

        // move the rounded rocks towards the bottom
        for (let i = 0; i < storeCount; i++) {
          this.set(x, y - 1 - i, "O");
        }
        y++;
      }
    }
  }

  private tiltWest(): void {
    for (let y = 0; y < this.height; y++) {
      let x = this.width - 1;
      while (x >= 0) {
        let storeCount = 0;
        // count the number of rounded rock until we hit a cubed rock
        while (x >= 0 && this.get(x, y) !== "#") {
          if (this.get(x, y) === "O") {
            storeCount++;
            this.set(x, y, ".");
          }
          x--;
        }

        // move the rounded rocks towards the bottom
        for (let i = 0; i < storeCount; i++) {
          this.set(x + 1 + i, y, "O");
        }
        x--;
      }
    }
  }

  private tiltEast(): void {
    for (let y = 0; y < this.height; y++) {
      let x = 0;
      while (x < this.width) {
        let storeCount = 0;
        // count the number of rounded rock until we hit a cubed rock
        while (x < this.width && this.get(x, y) !== "#") {
          if (this.get(x, y) === "O") {
            storeCount++;
            this.set(x, y, ".");
          }
          x++;
        }

        // move the rounded rocks towards the bottom
        for (let i = 0; i < storeCount; i++) {
          this.set(x - 1 - i, y, "O");
        }
        x++;
      }
    }
  }

  private getTotalLoadNorth(): number {
    let totalLoad = 0;

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.get(x, y) === "O") {
          totalLoad += this.height - y;
        }
      }
    }

    return totalLoad;
  }

  // Not needed for this puzzle
  private getTotalLoadSouth(): number {
    return 0;
  }

  // Not needed for this puzzle
  private getTotalLoadWest(): number {
    return 0;
  }

  // Not needed for this puzzle
  private getTotalLoadEast(): number {
    return 0;
  }
}
