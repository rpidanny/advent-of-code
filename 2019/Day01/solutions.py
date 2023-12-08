from functools import reduce

from helpers import fuel_required, fuel_required_recursive


def part1(inputs: list[str]) -> int:
    return reduce(lambda x, y: x + fuel_required(int(y)), inputs, 0)


def part2(inputs: list[str]) -> int:
    return reduce(lambda x, y: x + fuel_required_recursive(int(y)), inputs, 0)
