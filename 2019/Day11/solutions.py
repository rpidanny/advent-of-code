import sys

sys.path.append("utils")

from intcode import get_program
from robot import Robot


def part1(inputs: list[str]) -> int:
    robot = Robot(get_program(inputs))
    robot.run()

    return robot.num_painted_positions()


def part2(inputs: list[str]) -> int:
    robot = Robot(get_program(inputs), 1)
    robot.run()

    return robot.print_canvas()
