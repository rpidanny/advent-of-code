export const UP: [number, number] = [0, -1];
export const DOWN: [number, number] = [0, 1];
export const LEFT: [number, number] = [-1, 0];
export const RIGHT: [number, number] = [1, 0];
export const TOP_RIGHT: [number, number] = [1, 1];
export const BOTTOM_LEFT: [number, number] = [-1, -1];
export const TOP_LEFT: [number, number] = [-1, 1];
export const BOTTOM_RIGHT: [number, number] = [1, -1];

export type BasicDirection = "up" | "down" | "left" | "right";
export type AllDirection =
  | BasicDirection
  | "topRight"
  | "bottomLeft"
  | "topLeft"
  | "bottomRight";

export const basicDirections: Record<BasicDirection, [number, number]> = {
  up: UP,
  down: DOWN,
  left: LEFT,
  right: RIGHT,
};

export const allDirections: Record<AllDirection, [number, number]> = {
  ...basicDirections,
  topRight: TOP_RIGHT,
  bottomLeft: BOTTOM_LEFT,
  topLeft: TOP_LEFT,
  bottomRight: BOTTOM_RIGHT,
};
