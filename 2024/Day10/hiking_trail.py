from utils.directions import BASIC_DIRECTIONS


class HikingTrail:
    def __init__(self, lines: list[str]):
        self.grid = [[int(cell) for cell in line] for line in lines]
        self.maxY, self.maxX = len(self.grid), len(self.grid[0])

    def _explore_trail(self, x: int, y: int, peaks: set, rating: bool = False) -> int:
        height = self.grid[y][x]
        if height == 9:
            return 1 if rating else peaks.add((x, y)) or 0

        total = 0
        for dx, dy in BASIC_DIRECTIONS:
            nx, ny = x + dx, y + dy
            if (
                0 <= nx < self.maxX
                and 0 <= ny < self.maxY
                and self.grid[ny][nx] == height + 1
            ):
                total += self._explore_trail(nx, ny, peaks, rating)

        return total if rating else len(peaks)

    def _calculate_trail_scores(self, rating: bool = False) -> int:
        total = 0
        for y in range(self.maxY):
            for x in range(self.maxX):
                if self.grid[y][x] == 0:
                    total += self._explore_trail(x, y, set(), rating)
        return total

    def get_sum_of_trail_head_scores(self) -> int:
        return self._calculate_trail_scores()

    def get_sum_of_trail_head_ratings(self) -> int:
        return self._calculate_trail_scores(rating=True)
