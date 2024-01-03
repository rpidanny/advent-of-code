import sys

sys.path.append("utils")

from robot import Robot


def part1(inputs: list[str], visualize=False) -> int:
    r = Robot(inputs, visualize)
    return r.get_alignment_param()


def part2(inputs: list[str], visualize=False) -> int:
    r = Robot(inputs, visualize)
    return r.visit_scaffold()
