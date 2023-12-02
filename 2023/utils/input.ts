import fs from "fs";

export function getRawInput(filePath: string): string {
  return fs.readFileSync(filePath).toString("utf-8");
}

export function getInputLines(filePath: string): string[] {
  const rawInput = getRawInput(filePath);

  return rawInput.split("\n");
}
