export function printGrid(
  grid: any[][],
  mapper: (v: any) => string = (v) => v,
  delay = 0,
) {
  for (let i = 0; i < grid.length; i++) {
    const row = grid[i];
    process.stdout.cursorTo(0, Number(i));
    process.stdout.write(`${row.map(mapper).join(" ")}\n`);
  }
  if (delay) {
    sleep(delay);
  }
}

export function sleep(ms: number) {
  const start = Date.now();
  while (Date.now() - start < ms) {}
}
