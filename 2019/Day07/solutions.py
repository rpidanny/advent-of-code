import sys
from itertools import permutations

sys.path.append("utils")

from helpers import amplify, amplify_with_feedback
from intcode import get_program


def part1(inputs: list[str]) -> int:
    prog = get_program(inputs)

    max_output = 0
    for phases in list(permutations(range(5), 5)):
        max_output = max(max_output, amplify(prog, list(phases), 0))
    return max_output


def part2(inputs: list[str]) -> int:
    prog = get_program(inputs)

    max_output = 0
    for phases in list(permutations(range(5, 10), 5)):
        max_output = max(max_output, amplify_with_feedback(prog, list(phases), 0))
    return max_output
