import sys

sys.path.append("utils")

from inputs import extract_all_numbers
from jupiter import Jupiter


def part1(inputs: list[str], maxSteps=1000) -> int:
    moons = [[int(x) for x in extract_all_numbers(line)] for line in inputs]

    jupiter = Jupiter(moons)
    return jupiter.get_total_energy(maxSteps)


def part2(inputs: list[str]) -> int:
    moons = [[int(x) for x in extract_all_numbers(line)] for line in inputs]

    jupiter = Jupiter(moons)
    return jupiter.get_universe_repeat_time()
