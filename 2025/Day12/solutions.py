import re
from typing import Iterable, List, Tuple

Region = Tuple[int, int, List[int]]


def parseInput(lines: Iterable[str]) -> Tuple[List[List[str]], List[Region]]:
    """
    Parse puzzle input into:
        - shapes: list of shapes, each a list of strings of '#' and '.'
        - regions: list of (width, height, counts)
    """

    region_re = re.compile(r"^(\d+)x(\d+):\s*(.*)$")
    header_re = re.compile(r"^\d+:$")

    shapes: List[List[str]] = []
    regions: List[Region] = []
    cur_shape: List[str] = []

    for line in lines:
        # blank line ends a shape block
        if line == "":
            if cur_shape:
                shapes.append(cur_shape)
                cur_shape = []
            continue

        # skip headers like "0:"
        if header_re.match(line):
            continue

        # region line: "12x5: 1 0 1 0 3 2"
        m = region_re.match(line)
        if m:
            w, h = int(m.group(1)), int(m.group(2))
            counts = list(map(int, m.group(3).split()))
            regions.append((w, h, counts))
            continue

        # shape row
        cur_shape.append(line)

    return shapes, regions


def part1(lines: list[str]) -> int:
    _, regions = parseInput(lines)
    total = 0
    for x, y, counts in regions:
        if (x // 3) * (y // 3) >= sum(counts):
            total += 1

    return total


def part2(inputs: list[str]) -> int:
    return 2
