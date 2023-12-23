export type Direction = [number, number];

export const UP: Direction = [0, -1];
export const DOWN: Direction = [0, 1];
export const LEFT: Direction = [-1, 0];
export const RIGHT: Direction = [1, 0];
export const TOP_RIGHT: Direction = [1, 1];
export const BOTTOM_LEFT: Direction = [-1, -1];
export const TOP_LEFT: Direction = [-1, 1];
export const BOTTOM_RIGHT: Direction = [1, -1];

export type BasicDirection = "up" | "down" | "left" | "right";
export type AllDirection =
  | BasicDirection
  | "topRight"
  | "bottomLeft"
  | "topLeft"
  | "bottomRight";

export const basicDirections: Record<BasicDirection, Direction> = {
  up: UP,
  down: DOWN,
  left: LEFT,
  right: RIGHT,
};

export const allDirections: Record<AllDirection, Direction> = {
  ...basicDirections,
  topRight: TOP_RIGHT,
  bottomLeft: BOTTOM_LEFT,
  topLeft: TOP_LEFT,
  bottomRight: BOTTOM_RIGHT,
};
