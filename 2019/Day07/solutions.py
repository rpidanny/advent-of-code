from itertools import permutations

from helpers import amplify


def part1(inputs: list[str]) -> int:
    max_output = 0
    for phases in list(permutations(range(5), 5)):
        max_output = max(max_output, amplify(inputs, list(phases), 0))
    return max_output


def part2(inputs: list[str]) -> int:
    max_output = 0
    for phases in list(permutations(range(9), 5)):
        max_output = max(max_output, amplify(inputs, list(phases), 0))
    return max_output
