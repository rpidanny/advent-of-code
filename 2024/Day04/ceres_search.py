from utils.directions import ALL_DIRECTIONS


class CeresSearch:
    TARGET_WORD = "XMAS"

    def __init__(self, lines: list[str]):
        self.lines = lines
        self.rows = len(lines)
        self.cols = len(lines[0]) if lines else 0

    def dfs(self, x: int, y: int, idx: int, direction: tuple[int, int]) -> int:
        if not (0 <= x < self.rows and 0 <= y < self.cols):
            return 0
        if self.lines[x][y] != self.TARGET_WORD[idx]:
            return 0
        if idx == len(self.TARGET_WORD) - 1:
            return 1

        dx, dy = direction
        return self.dfs(x + dx, y + dy, idx + 1, direction)

    def search_xmas(self) -> int:
        count = 0
        for i in range(self.rows):
            for j in range(self.cols):
                if self.lines[i][j] == self.TARGET_WORD[0]:
                    for direction in ALL_DIRECTIONS:
                        count += self.dfs(i, j, 0, direction)

        return count

    def is_x_mas(self, x: int, y: int) -> bool:
        corners = [
            self.lines[x - 1][y - 1],
            self.lines[x - 1][y + 1],
            self.lines[x + 1][y - 1],
            self.lines[x + 1][y + 1],
        ]
        return corners in [
            ["M", "S", "M", "S"],
            ["S", "M", "S", "M"],
            ["M", "M", "S", "S"],
            ["S", "S", "M", "M"],
        ]

    def search_x_mas_patterns(self) -> int:
        return sum(
            1
            for i in range(1, self.rows - 1)
            for j in range(1, self.cols - 1)
            if self.lines[i][j] == "A" and self.is_x_mas(i, j)
        )
