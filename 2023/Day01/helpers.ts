export const digitStrings: Record<string, number> = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

export function findFirstInt(str: string, forward = true): number {
  let num: number;
  let pointer = forward ? 0 : str.length - 1;
  while (true) {
    const char = str[pointer];

    if (!isNaN(parseInt(char))) {
      num = parseInt(char);
      break;
    }

    const subStr = forward
      ? str.substring(0, pointer + 1)
      : str.substring(pointer);
    const matches = subStr.match(
      /zero|one|two|three|four|five|six|seven|eight|nine/
    );
    if (matches && digitStrings[matches[0]]) {
      num = digitStrings[matches[0]];
      break;
    }

    forward ? pointer++ : pointer--;
  }

  return num;
}
