from helpers import (
    get_num_of_orbital_transfers,
    get_total_orbits,
)


def part1(inputs: list[str]) -> int:
    return get_total_orbits(inputs)


def part2(inputs: list[str]) -> int:
    return get_num_of_orbital_transfers(inputs)
