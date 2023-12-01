import fs from "fs";
import path from "path";

export function getRawInput(filePath: string): string {
  const rawInput = fs
    .readFileSync(path.join(__dirname, "../", filePath))
    .toString("utf-8");

  return rawInput;
}

export function getInputLines(filePath: string): string[] {
  const rawInput = getRawInput(filePath);

  return rawInput.split("\n");
}
