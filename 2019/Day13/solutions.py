import sys

sys.path.append("utils")

from arcade import Arcade
from intcode import get_program


def part1(inputs: list[str], headless=True) -> int:
    prog = get_program(inputs)
    arcade = Arcade(prog, headless)
    return arcade.get_num_blocks()


def part2(inputs: list[str], headless=True) -> int:
    prog = get_program(inputs)
    arcade = Arcade(prog, headless)
    return arcade.run()
