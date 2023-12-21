export function repeatArray(
  originalArray: string[][],
  times: number,
): string[][] {
  const rows = originalArray.length;
  const cols = originalArray[0].length;

  // Create a new array with dimensions 3nx3n
  const expandedArray: string[][] = new Array(times * rows);
  for (let i = 0; i < times * rows; i++) {
    expandedArray[i] = new Array(times * cols);
  }

  // Copy the original array into the center of the expanded array
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      expandedArray[i + rows][j + cols] = originalArray[i][j];
    }
  }

  // Copy the original array to other positions around the center
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // Top
      expandedArray[i][j + cols] = originalArray[i][j];
      // Bottom
      expandedArray[i + 2 * rows][j + cols] = originalArray[i][j];
      // Left
      expandedArray[i + rows][j] = originalArray[i][j];
      // Right
      expandedArray[i + rows][j + 2 * cols] = originalArray[i][j];
      // Top Left
      expandedArray[i][j] = originalArray[i][j];
      // Top Right
      expandedArray[i][j + 2 * cols] = originalArray[i][j];
      // Bottom Left
      expandedArray[i + 2 * rows][j] = originalArray[i][j];
      // Bottom Right
      expandedArray[i + 2 * rows][j + 2 * cols] = originalArray[i][j];
    }
  }

  return expandedArray;
}
