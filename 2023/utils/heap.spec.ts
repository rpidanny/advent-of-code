import { Heap } from "./heap";

describe("heap", () => {
  const numbers = [10, 17, 9, 29, 2, 100, 88, 1, -1, 0, 89, -8];

  describe.each`
    comparator                         | type
    ${(a: number, b: number) => a - b} | ${"min"}
    ${(a: number, b: number) => b - a} | ${"max"}
  `("$type heap", ({ comparator }) => {
    it("should return items in ascending order", () => {
      const minHeap = new Heap(comparator);

      for (let i = 0; i < numbers.length; i++) {
        minHeap.add({ weight: numbers[i] });
      }

      const items = [];
      for (let i = 0; i < numbers.length; i++) {
        items.push(minHeap.pop().weight);
      }

      expect(items).toEqual(numbers.sort(comparator));
    });
  });
});
