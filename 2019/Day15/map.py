from time import sleep

from cell import empty_char, oxygen_char, visited_char, wall_char
from direction import Direction
from robot import Cell, Robot

from utils.output import print_grid_dict


class Map:
    def __init__(self, input, visualize=False):
        self.visualize = visualize
        self.robot = Robot(input, visualize=visualize)
        self.grid = self.robot.explore()
        self.oxygen = self.robot.get_oxygen_pos()
        self.start = self.robot.get_start_pos()
        self.dirs = [Direction.NORTH, Direction.EAST, Direction.SOUTH, Direction.WEST]
        self.delay = 0.001

    def get_cell_char(self, pos: [int, int], visited: set, char: str) -> str:
        if pos in visited:
            return char

        tile_symbols = {
            Cell.EMPTY: empty_char,
            Cell.WALL: wall_char,
            Cell.OXYGEN: oxygen_char,
        }
        return tile_symbols.get(self.grid.get(pos, Cell.WALL))

    def get_min_steps_to_oxygen(self) -> int:
        queue, visited = [(self.start, 0)], set()

        while queue:
            pos, steps = queue.pop(0)
            visited.add(pos)
            if pos == self.oxygen:
                return steps

            queue.extend(
                (next_pos, steps + 1)
                for d in self.dirs
                if (next_pos := d.move(pos)) not in visited
                and self.grid[next_pos] != Cell.WALL
            )
            if self.visualize:
                print_grid_dict(
                    self.grid,
                    lambda p: self.get_cell_char(p, visited, visited_char),
                    self.delay,
                )

    def get_min_time_to_fill(self) -> int:
        queue, visited = [(self.oxygen, 0)], set()

        while queue:
            pos, time = queue.pop(0)
            visited.add(pos)
            queue.extend(
                (next_pos, time + 1)
                for d in self.dirs
                if (next_pos := d.move(pos)) not in visited
                and self.grid[next_pos] != Cell.WALL
            )
            if self.visualize:
                print_grid_dict(
                    self.grid,
                    lambda p: self.get_cell_char(p, visited, oxygen_char),
                    self.delay,
                )
        return time
