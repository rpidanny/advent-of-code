export function leastCommonMultiple(numbers: number[]): number {
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const lcm = (a: number, b: number): number => (a * b) / gcd(a, b);

  return numbers.reduce((acc, curr) => lcm(acc, curr), 1);
}
