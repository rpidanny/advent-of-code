export function getPatterns(inputs: string[]): string[][] {
  const patterns: string[][] = [];

  let currentPattern: string[] = [];
  for (const input of inputs) {
    if (input !== "") {
      currentPattern.push(input);
      continue;
    }

    patterns.push(currentPattern);
    currentPattern = [];
  }

  patterns.push(currentPattern);

  return patterns;
}

/**
 * Rotate a pattern 90 degrees clockwise
 *
 **/
function rotatePattern(pattern: string[]): string[] {
  return Array.from({ length: pattern[0].length }, (_, i) =>
    pattern
      .map((row) => row[i])
      .reverse()
      .join(""),
  );
}

/**
 * Count the number of characters that differ between two strings
 *
 **/
function patternDiff(a: string, b: string): number {
  return Array.from(a).reduce(
    (count, char, i) => count + (char !== b[i] ? 1 : 0),
    0,
  );
}

function findMirrorLocation(
  pattern: string[],
  fixSmudge: boolean,
): number | undefined {
  for (let i = 0; i < pattern.length - 1; i++) {
    let depth = 0;
    let smudge = 0;
    let diff = patternDiff(pattern[i], pattern[i + 1]);

    while (diff <= 1) {
      if (!fixSmudge && diff === 1) break; // if we're not fixing smudges, we can bail early
      if (diff === 1) smudge++;

      if (smudge > 1) break; // if we've already smudged twice, we can bail early since only 1 fix is allowed

      if (i - depth === 0 || i + 1 + depth === pattern.length - 1) {
        if (!fixSmudge || smudge === 1) return i + 1; // if we're not fixing smudges, or we've only fixed smudges once, we can return the location. +1 because it's 0-indexed
        break;
      }

      depth++;
      diff = patternDiff(pattern[i - depth], pattern[i + 1 + depth]);
    }
  }
}

export function summarizePattern(pattern: string[], fix = false): number {
  const rowLocation = findMirrorLocation(pattern, fix);

  // First, try finding the mirror in the rows
  // if we can't find it, rotate the pattern and try again i.e. find the mirror in the columns
  // Rotating the pattern is the same as rotating the mirror location 90 degrees clockwise. This allows easy calculation of the mirror location in the columns
  return rowLocation !== undefined
    ? rowLocation * 100
    : findMirrorLocation(rotatePattern(pattern), fix);
}
