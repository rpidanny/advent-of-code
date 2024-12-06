import os
from copy import deepcopy

from termcolor import colored

from utils.output import print_grid


class GuardGallivant:
    def __init__(self, grid: list[str]):
        self.grid = [list(row) for row in grid]
        self.initial_direction = (0, -1)
        self.rows, self.cols = len(self.grid), len(self.grid[0])
        self.visualize = os.environ.get("VISUALIZE", "False") == "True"
        self.dir_map = {
            (0, -1): "^",
            (0, 1): "v",
            (-1, 0): "<",
            (1, 0): ">",
        }

    def simulate_move(self, start: tuple[int, int]) -> set[tuple[int, int]]:
        visited = set()
        x, y = start
        dx, dy = self.initial_direction

        while True:
            visited.add((x, y))
            nx, ny = x + dx, y + dy

            if not (0 <= nx < self.cols and 0 <= ny < self.rows):
                break

            if self.grid[ny][nx] == "#":
                dx, dy = -dy, dx
            else:
                x, y = nx, ny

        return visited

    def _get_start_pos(self) -> tuple[int, int]:
        for y, row in enumerate(self.grid):
            for x, cell in enumerate(row):
                if cell == "^":
                    return x, y
        return -1, -1

    def _creates_loop(self, start: tuple[int, int]) -> bool:
        visited_states = set()
        x, y = start
        dx, dy = self.initial_direction

        if self.visualize:
            grid = deepcopy(self.grid)

        while True:
            state = (x, y, dx, dy)
            if state in visited_states:
                return True
            visited_states.add(state)

            if self.visualize:
                grid[y][x] = colored(self.dir_map[(dx, dy)], "red")
                print_grid(grid, delay=0.01, padding=True)
                grid[y][x] = colored("*", "green")

            nx, ny = x + dx, y + dy
            if not (0 <= nx < self.cols and 0 <= ny < self.rows):
                return False

            if self.grid[ny][nx] == "#" or self.grid[ny][nx] == "O":
                dx, dy = -dy, dx
            else:
                x, y = nx, ny

    def get_distinct_visited_positions(self) -> set[tuple[int, int]]:
        start = self._get_start_pos()
        return self.simulate_move(start)

    def get_num_distinct_visited_positions_with_loop(self) -> int:
        start = self._get_start_pos()
        positions = self.simulate_move(start) - {start}

        count = 0
        for x, y in positions:
            self.grid[y][x] = "O"
            if self._creates_loop(start):
                count += 1
            self.grid[y][x] = "."
        return count
