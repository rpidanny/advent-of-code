const { step1, step2 } = require("./solutions");

describe("Solutions", () => {
  describe("step 1", () => {
    test.each`
      input                                  | output
      ${"mjqjpqmgbljsphdztnvjfqwrcgsmlb"}    | ${7}
      ${"bvwbjplbgvbhsrlpgdmjqwftvncz"}      | ${5}
      ${"nppdvjthqldpwncqszvftbrmjlhg"}      | ${6}
      ${"nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg"} | ${10}
      ${"zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"}  | ${11}
    `("should return $output as start-of-packet for $input", ({ input, output }) => {
      expect(step1([input])).toEqual(output);
    });
  });

  describe("step 2", () => {
    test.each`
      input                                  | output
      ${"mjqjpqmgbljsphdztnvjfqwrcgsmlb"}    | ${19}
      ${"bvwbjplbgvbhsrlpgdmjqwftvncz"}      | ${23}
      ${"nppdvjthqldpwncqszvftbrmjlhg"}      | ${23}
      ${"nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg"} | ${29}
      ${"zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"}  | ${26}
    `("should return $output as start-of-message for $input", ({ input, output }) => {
      expect(step2([input])).toEqual(output);
    });
  });
});
