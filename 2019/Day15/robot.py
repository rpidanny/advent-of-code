import sys

sys.path.append("utils")

from collections import defaultdict

from cell import Cell, empty_char, hidden_char, oxygen_char, wall_char
from direction import Direction
from intcode import IntCode, get_program

from utils.output import print_grid_dict


class Robot:
    def __init__(self, input, start_pos=(0, 0), visualize=False):
        self.intcode = IntCode(get_program(input), self.get_input)
        self.start_pos = start_pos
        self.pos = start_pos
        self.oxygen_pos = None
        self.grid = defaultdict(int)
        self.grid[self.pos] = Cell.EMPTY
        self.dir = Direction.NORTH
        self.visualize = visualize
        self.delay = 0.00001

    def get_input(self) -> int:
        return self.dir.value

    def get_cell_char(self, pos: [int, int]) -> str:
        tile_symbols = {
            Cell.EMPTY: empty_char,
            Cell.WALL: wall_char,
            Cell.OXYGEN: oxygen_char,
            None: hidden_char,
        }
        return tile_symbols.get(self.grid.get(pos, None))

    def get_oxygen_pos(self) -> tuple:
        return self.oxygen_pos

    def get_start_pos(self) -> tuple:
        return self.start_pos

    def explore(self):
        while True:
            res = self.intcode.run()

            next_pos = self.dir.move(self.pos)

            self.grid[next_pos] = Cell(res.output)

            if self.grid[next_pos] != Cell.WALL:
                self.pos = next_pos
                if self.pos == (0, 0):
                    break
                if self.grid[next_pos] == Cell.OXYGEN:
                    self.oxygen_pos = self.pos

                self.dir = self.dir.right()
            else:
                self.dir = self.dir.left()

            if res.halted:
                break

            if self.visualize:
                print_grid_dict(self.grid, self.get_cell_char, self.delay)
                print(f"Pos: {self.pos}")
        return self.grid
