import {
  getAreaOfPolygon,
  getInnerAreaOfPolygon,
  getPerimeterOfPolygon,
} from "./polygon";

describe("Polygon Utils", () => {
  describe("getAreaOfPolygon", () => {
    it("should return the correct area for a triangle", () => {
      const points: [number, number][] = [
        [0, 0],
        [0, 4],
        [3, 0],
        [0, 0],
      ];
      const area = getAreaOfPolygon(points);
      expect(area).toBe(6);
    });

    it("should return the correct area for a rectangle", () => {
      const points: [number, number][] = [
        [0, 0],
        [0, 4],
        [3, 4],
        [3, 0],
        [0, 0],
      ];
      const area = getAreaOfPolygon(points);
      expect(area).toBe(12);
    });

    it("should return the correct area for a concave polygon", () => {
      const points: [number, number][] = [
        [0, 0],
        [0, 4],
        [2, 2],
        [3, 4],
        [3, 0],
        [0, 0],
      ];
      const area = getAreaOfPolygon(points);
      expect(area).toBe(9);
    });

    it("should return the correct area for a simple polygon", () => {
      const points: [number, number][] = [
        [2, 7],
        [10, 1],
        [8, 6],
        [11, 7],
        [7, 10],
        [2, 7],
      ];
      const area = getAreaOfPolygon(points);
      expect(area).toBe(32);
    });

    it("should return the correct area for a complex polygon", () => {
      const points: [number, number][] = [
        [0, 0],
        [0, 4],
        [2, 2],
        [3, 4],
        [3, 0],
        [1, 1],
        [0, 0],
      ];
      const area = getAreaOfPolygon(points);
      expect(area).toBe(7.5);
    });
  });

  describe("getPerimeterOfPolygon", () => {
    it("should return the correct perimeter for a triangle", () => {
      const points: [number, number][] = [
        [0, 0],
        [0, 4],
        [3, 0],
        [0, 0],
      ];
      const perimeter = getPerimeterOfPolygon(points);
      expect(perimeter).toBe(14);
    });

    it("should return the correct perimeter for a rectangle", () => {
      const points: [number, number][] = [
        [0, 0],
        [0, 4],
        [3, 4],
        [3, 0],
        [0, 0],
      ];
      const perimeter = getPerimeterOfPolygon(points);
      expect(perimeter).toBe(14);
    });

    it("should return the correct perimeter for a concave polygon", () => {
      const points: [number, number][] = [
        [0, 0],
        [0, 4],
        [2, 2],
        [3, 4],
        [3, 0],
        [0, 0],
      ];
      const perimeter = getPerimeterOfPolygon(points);
      expect(perimeter).toBe(18);
    });

    it("should return the correct perimeter for a simple polygon", () => {
      const points: [number, number][] = [
        [2, 7],
        [10, 1],
        [8, 6],
        [11, 7],
        [7, 10],
        [2, 7],
      ];
      const perimeter = getPerimeterOfPolygon(points);
      expect(perimeter).toBe(40);
    });

    it("should return the correct perimeter for a complex polygon", () => {
      const points: [number, number][] = [
        [0, 0],
        [0, 4],
        [2, 2],
        [3, 4],
        [3, 0],
        [1, 1],
        [0, 0],
      ];
      const perimeter = getPerimeterOfPolygon(points);
      expect(perimeter).toBe(20);
    });

    it("should return the correct perimeter for a complex polygon 2", () => {
      const points: [number, number][] = [
        [0, 0],
        [6, 0],
        [6, -5],
        [4, -5],
        [4, -7],
        [6, -7],
        [6, -9],
        [1, -9],
        [1, -7],
        [0, -7],
        [0, -5],
        [2, -5],
        [2, -2],
        [0, -2],
        [0, 0],
      ];
      const innerArea = getPerimeterOfPolygon(points);
      expect(innerArea).toBe(38);
    });
  });

  describe("getInnerAreaOfPolygon", () => {
    it("should return the correct inner area for a triangle", () => {
      const points: [number, number][] = [
        [0, 0],
        [0, 4],
        [3, 0],
        [0, 0],
      ];
      const innerArea = getInnerAreaOfPolygon(points);
      expect(innerArea).toBe(0);
    });

    it("should return the correct inner area for a rectangle", () => {
      const points: [number, number][] = [
        [0, 0],
        [0, 4],
        [3, 4],
        [3, 0],
        [0, 0],
      ];
      const innerArea = getInnerAreaOfPolygon(points);
      expect(innerArea).toBe(6);
    });

    it("should return the correct inner area for a concave polygon", () => {
      const points: [number, number][] = [
        [0, 0],
        [0, 4],
        [2, 2],
        [3, 4],
        [3, 0],
        [0, 0],
      ];
      const innerArea = getInnerAreaOfPolygon(points);
      expect(innerArea).toBe(1);
    });

    it("should return the correct inner area for a simple polygon", () => {
      const points: [number, number][] = [
        [2, 7],
        [10, 1],
        [8, 6],
        [11, 7],
        [7, 10],
        [2, 7],
      ];
      const innerArea = getInnerAreaOfPolygon(points);
      expect(innerArea).toBe(13);
    });

    it("should return the correct inner area for a complex polygon", () => {
      const points: [number, number][] = [
        [0, 0],
        [0, 4],
        [2, 2],
        [3, 4],
        [3, 0],
        [1, 1],
        [0, 0],
      ];
      const innerArea = getInnerAreaOfPolygon(points);
      expect(innerArea).toBe(-1.5);
    });

    it("should return the correct inner area for a complex polygon 2", () => {
      const points: [number, number][] = [
        [0, 0],
        [6, 0],
        [6, -5],
        [4, -5],
        [4, -7],
        [6, -7],
        [6, -9],
        [1, -9],
        [1, -7],
        [0, -7],
        [0, -5],
        [2, -5],
        [2, -2],
        [0, -2],
        [0, 0],
      ];
      const innerArea = getInnerAreaOfPolygon(points);
      expect(innerArea).toBe(24);
    });
  });
});
