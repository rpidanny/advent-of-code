import os
from collections import defaultdict
from enum import Enum
from time import sleep

from intcode import IntCode


class Tile(Enum):
    EMPTY = 0
    WALL = 1
    BLOCK = 2
    PADDLE = 3
    BALL = 4


class JoyStickPosition(Enum):
    NEUTRAL = 0
    LEFT = -1
    RIGHT = 1


class Arcade:
    def __init__(self, prog, headless=True):
        self.prog = prog
        self.headless = headless
        self.intcode = IntCode(self.prog, self.get_input)
        self.screen = defaultdict(str)
        self.paddle_pos = None
        self.ball_pos = None
        self.delay = 0.0001
        self.score = 0

    def get_input(self) -> int:
        return self.get_joystick_position().value

    def get_tile(self, tile: Tile) -> str:
        tile_symbols = {
            Tile.EMPTY: " ",
            Tile.WALL: "█",
            Tile.BLOCK: "$",
            Tile.PADDLE: "_",
            Tile.BALL: "o",
        }
        return tile_symbols.get(tile, " ")

    def draw_screen(self):
        if self.headless:
            return

        os.system("cls" if os.name == "nt" else "clear")

        min_x = min(self.screen.keys(), key=lambda k: k[0])[0]
        max_x = max(self.screen.keys(), key=lambda k: k[0])[0]
        min_y = min(self.screen.keys(), key=lambda k: k[1])[1]
        max_y = max(self.screen.keys(), key=lambda k: k[1])[1]

        print(f"Score: {self.score}")
        for y in range(min_y, max_y + 1):
            print(
                "".join(
                    self.get_tile(self.screen[(x, y)]) for x in range(min_x, max_x + 1)
                )
            )
        print("".join(self.get_tile(Tile.WALL) for _ in range(min_x, max_x + 1)))
        sleep(self.delay)

    def get_joystick_position(self) -> JoyStickPosition:
        x1, _ = self.ball_pos
        x2, _ = self.paddle_pos
        return (
            JoyStickPosition.LEFT
            if x1 < x2
            else JoyStickPosition.RIGHT
            if x1 > x2
            else JoyStickPosition.NEUTRAL
        )

    def get_num_blocks(self):
        blocks = 0
        while True:
            x, y, t = self.intcode.run(), self.intcode.run(), self.intcode.run()
            self.screen[(x.output, y.output)] = Tile(t.output)
            blocks += t.output == Tile.BLOCK.value
            if t.halted:
                break
        self.draw_screen()
        return blocks

    def run(self):
        self.prog[0] = 2
        while True:
            x, y, t = self.intcode.run(), self.intcode.run(), self.intcode.run()

            if x.output == -1 and y.output == 0:
                self.score = t.output
                continue

            self.screen[(x.output, y.output)] = Tile(t.output)

            if t.output == Tile.PADDLE.value:
                self.paddle_pos = (x.output, y.output)
            elif t.output == Tile.BALL.value:
                self.ball_pos = (x.output, y.output)

            if self.paddle_pos and self.ball_pos:
                self.draw_screen()

            if t.halted:
                break

        return self.score
