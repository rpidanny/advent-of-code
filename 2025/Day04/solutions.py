from utils import directions


def part1(inputs: list[str]) -> int:
    count, m, n = 0, len(inputs), len(inputs[0])

    def is_valid_paper_roll(r: int, c: int) -> bool:
        adj_count = 0
        for dr, dc in directions.ALL_DIRECTIONS:
            nr, nc = dr + r, dc + c
            if 0 <= nr < m and 0 <= nc < n and inputs[nr][nc] == "@":
                adj_count += 1
                if adj_count >= 4:
                    return False
        return True

    for r in range(m):
        for c in range(n):
            if inputs[r][c] == "@" and is_valid_paper_roll(r, c):
                count += 1

    return count


def part2(inputs: list[str]) -> int:
    grid = list(map(list, inputs))
    count, m, n = 0, len(grid), len(grid[0])

    def is_valid_paper_roll(r: int, c: int) -> bool:
        adj_count = 0
        for dr, dc in directions.ALL_DIRECTIONS:
            nr, nc = dr + r, dc + c
            if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == "@":
                adj_count += 1
                if adj_count >= 4:
                    return False
        return True

    while True:
        remove_count = 0
        for r in range(m):
            for c in range(n):
                if grid[r][c] == "@" and is_valid_paper_roll(r, c):
                    grid[r][c] = "."
                    remove_count += 1
        if remove_count == 0:
            break
        count += remove_count

    return count
