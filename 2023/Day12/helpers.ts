interface IConditionRecord {
  springs: string;
  groups: number[];
}

function parseLine(line: string, unfold: boolean): IConditionRecord {
  const n = unfold ? 5 : 1;

  const [springs, sizeOfGroups] = line.split(" ");

  return {
    springs: `.${new Array(n).fill(springs).join("?")}.`,
    groups: new Array(n).fill(sizeOfGroups.split(",").map(Number)).flat(),
  };
}

export function getPossibleArrangements(line: string, unfold = false): number {
  const { springs, groups } = parseLine(line, unfold);
  const memo = new Map();

  function numOfPossibleArrangements(
    idx: number,
    gIdx: number,
    remaining: number,
  ): number {
    const id = `${idx}-${gIdx}-${remaining}`;
    if (memo.has(id)) return memo.get(id);

    if (idx === springs.length)
      return gIdx === groups.length && remaining === 0 ? 1 : 0;
    if (gIdx > groups.length) return 0;

    let total = 0;

    if ("?.".indexOf(springs[idx]) > -1) {
      if (remaining === 0) {
        if (gIdx < groups.length) {
          total += numOfPossibleArrangements(idx + 1, gIdx + 1, groups[gIdx]);
        }
        total += numOfPossibleArrangements(idx + 1, gIdx, 0);
      }
    }

    if ("?#".indexOf(springs[idx]) > -1) {
      if (remaining > 0) {
        total += numOfPossibleArrangements(idx + 1, gIdx, remaining - 1);
      }
    }

    memo.set(id, total);

    return total;
  }

  return numOfPossibleArrangements(0, 0, 0);
}
