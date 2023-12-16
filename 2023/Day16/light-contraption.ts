import { basicDirections } from "../utils/directions";

export enum Direction {
  UP = "up",
  DOWN = "down",
  LEFT = "left",
  RIGHT = "right",
}

interface Pos {
  x: number;
  y: number;
}

interface Step {
  dir: Direction;
  pos: Pos;
}

export class LightContraption {
  constructor(private readonly board: string[]) {}

  public countEnergized({ dir, pos }: Step): number {
    const stack: Step[] = [{ dir, pos }];
    const energizedCells = new Map<string, Set<Direction>>();

    while (stack.length) {
      const {
        dir,
        pos: { x, y },
      } = stack.pop();

      const key = `${x}-${y}`;
      if (energizedCells.get(key)?.has(dir)) continue;
      if (!energizedCells.has(key)) {
        energizedCells.set(key, new Set());
      }

      energizedCells.get(key).add(dir);

      for (const move of this.getNextSteps(dir, { x, y })) {
        if (this.isInvalidPos(move.pos)) continue;

        stack.push(move);
      }
    }

    return energizedCells.size;
  }

  public maxEnergized(): number {
    let maxEnergy = 0;

    for (let i = 0; i < this.board.length; i++) {
      maxEnergy = Math.max(
        maxEnergy,
        this.countEnergized({
          dir: Direction.RIGHT,
          pos: { x: 0, y: i },
        }),
        this.countEnergized({
          dir: Direction.LEFT,
          pos: { x: this.board.length - 1, y: i },
        }),
      );
    }

    for (let i = 0; i < this.board[0].length; i++) {
      maxEnergy = Math.max(
        maxEnergy,
        this.countEnergized({
          dir: Direction.DOWN,
          pos: { x: i, y: 0 },
        }),
        this.countEnergized({
          dir: Direction.UP,
          pos: { x: i, y: this.board.length - 1 },
        }),
      );
    }

    return maxEnergy;
  }

  private isInvalidPos({ x, y }: Pos): boolean {
    return (
      x < 0 || y < 0 || x >= this.board[0].length || y >= this.board.length
    );
  }

  private move(dir: Direction, { x, y }: Pos): Step {
    const [dx, dy] = basicDirections[dir];
    return { dir, pos: { x: x + dx, y: y + dy } };
  }

  private getNextSteps(dir: Direction, pos: Pos): Step[] {
    const tile = this.board[pos.y][pos.x];

    const moveRight = this.move(Direction.RIGHT, pos);
    const moveLeft = this.move(Direction.LEFT, pos);
    const moveUp = this.move(Direction.UP, pos);
    const moveDown = this.move(Direction.DOWN, pos);

    switch (dir) {
      case Direction.RIGHT:
        switch (tile) {
          case ".":
          case "-":
            return [moveRight];
          case "/":
            return [moveUp];
          case "\\":
            return [moveDown];
          case "|":
            return [moveUp, moveDown];
        }
      case Direction.LEFT:
        switch (tile) {
          case ".":
          case "-":
            return [moveLeft];
          case "/":
            return [moveDown];
          case "\\":
            return [moveUp];
          case "|":
            return [moveUp, moveDown];
        }
      case Direction.UP:
        switch (tile) {
          case ".":
          case "|":
            return [moveUp];
          case "/":
            return [moveRight];
          case "\\":
            return [moveLeft];
          case "-":
            return [moveLeft, moveRight];
        }
      case Direction.DOWN:
        switch (tile) {
          case ".":
          case "|":
            return [moveDown];
          case "/":
            return [moveLeft];
          case "\\":
            return [moveRight];
          case "-":
            return [moveLeft, moveRight];
        }
    }
  }
}
