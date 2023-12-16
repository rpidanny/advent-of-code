from helpers import get_astroid_locations


def part1(inputs: list[str]) -> int:
    astroid_locations = get_astroid_locations(inputs)
    print(astroid_locations)
    return 1


def part2(inputs: list[str]) -> int:
    return 2
