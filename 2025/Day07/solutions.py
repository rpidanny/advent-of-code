from functools import lru_cache
from typing import Tuple


def get_start(inputs: list[str]) -> Tuple[int, int]:
    for c in range(len(inputs[0])):
        if inputs[0][c] == "S":
            return (0, c)


def part1(inputs: list[str]) -> int:
    grid = list(map(list, inputs))
    count, m, n = 0, len(grid), len(grid[0])

    sr, sc = get_start(inputs)

    queue = [(sr + 1, sc)]

    while queue:
        r, c = queue.pop()

        grid[r][c] = "|"

        nr = r + 1
        if nr < m:
            if grid[nr][c] == "|":
                continue

            if grid[nr][c] == ".":
                queue.append((nr, c))
            else:
                for dc in [1, -1]:
                    nc = dc + c
                    if 0 <= nc < n and grid[nr][nc] == ".":
                        queue.append((nr, nc))
                count += 1

    return count


def part2(inputs: list[str]) -> int:
    m, n = len(inputs), len(inputs[0])
    sr, sc = get_start(inputs)

    @lru_cache(maxsize=None)
    def dfs(r: int, c: int) -> int:
        if not (0 <= c < n):
            return 0

        nr = r + 1
        if nr < m:
            if inputs[nr][c] == ".":
                return dfs(nr, c)
            else:
                return dfs(nr, c - 1) + dfs(nr, c + 1)
        return 1

    return dfs(sr, sc)
