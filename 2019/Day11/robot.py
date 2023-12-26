from collections import defaultdict
from time import sleep

from intcode import IntCode


class Robot:
    def __init__(self, prog: dict[int, int], base_color=0) -> None:
        self.__base_color = base_color
        self.__pos = (0, 0)
        self.__dir = (0, 1)
        self.__canvas = defaultdict(int)
        self.__inputs = []
        self.__intcode = IntCode(prog, 0, self.__inputs)

    def __move(self, direction: int) -> None:
        dx, dy = self.__dir
        self.__dir = (-dy, dx) if direction == 0 else (dy, -dx)
        self.__pos = (self.__pos[0] + self.__dir[0], self.__pos[1] + self.__dir[1])

    def __paint(self, color: int) -> None:
        self.__canvas[self.__pos] = color

    def __get_color(self, pos: [int, int], default=True) -> int:
        return self.__canvas.get(pos, self.__base_color if default else None)

    def num_painted_positions(self) -> int:
        return len(self.__canvas)

    def run(self) -> None:
        while True:
            self.__inputs.append(self.__get_color(self.__pos))
            state = self.__intcode.run()

            if state.halted:
                break

            self.__paint(state.output)

            state = self.__intcode.run()

            if state.halted:
                break

            self.__move(state.output)

    def print_canvas(self) -> None:
        min_x = min(self.__canvas.keys(), key=lambda p: p[0])[0]
        max_x = max(self.__canvas.keys(), key=lambda p: p[0])[0]
        min_y = min(self.__canvas.keys(), key=lambda p: p[1])[1]
        max_y = max(self.__canvas.keys(), key=lambda p: p[1])[1]

        print()
        for y in range(max_y, min_y - 1, -1):
            for x in range(min_x, max_x + 1):
                print("█" if self.__get_color((x, y), False) == 1 else " ", end="")
            print()
