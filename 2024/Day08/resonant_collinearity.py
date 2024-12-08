from itertools import combinations
from typing import Dict, List, Tuple


class ResonantCollinearity:
    def __init__(self, lines: List[str]):
        self.grid = [list(line) for line in lines]
        self.rows, self.cols = len(self.grid), len(self.grid[0])
        self.antennas = self._get_antennas()

    def _get_antennas(self) -> Dict[str, List[Tuple[int, int]]]:
        antennas = {}
        for y, row in enumerate(self.grid):
            for x, cell in enumerate(row):
                if cell != ".":
                    antennas.setdefault(cell, []).append((x, y))
        return antennas

    def _valid_position(self, x: int, y: int) -> bool:
        return 0 <= x < self.cols and 0 <= y < self.rows

    def _generate_antinode_candidates(
        self, p1: Tuple[int, int], p2: Tuple[int, int]
    ) -> List[Tuple[int, int]]:
        x1, y1 = p1
        x2, y2 = p2
        return [(2 * x2 - x1, 2 * y2 - y1), (2 * x1 - x2, 2 * y1 - y2)]

    def count_antinode(self) -> int:
        anti_nodes = set()
        for positions in self.antennas.values():
            for p1, p2 in combinations(positions, 2):
                for antinode in self._generate_antinode_candidates(p1, p2):
                    if self._valid_position(*antinode):
                        anti_nodes.add(antinode)
        return len(anti_nodes)

    def count_antinode_with_harmonics(self) -> int:
        anti_nodes = set()
        for positions in self.antennas.values():
            for p1, p2 in combinations(positions, 2):
                dx, dy = p2[0] - p1[0], p2[1] - p1[1]

                for start_x, start_y, step in [(p1[0], p1[1], 1), (p2[0], p2[1], -1)]:
                    x, y = start_x, start_y
                    while self._valid_position(x, y):
                        anti_nodes.add((x, y))
                        x += step * dx
                        y += step * dy
        return len(anti_nodes)
