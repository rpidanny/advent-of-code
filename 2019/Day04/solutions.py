from helper import count_valid_passwords


def part1(inputs: list[str]) -> int:
    lower, upper = map(int, inputs[0].split("-"))

    return count_valid_passwords(lower, upper, False)


def part2(inputs: list[str]) -> int:
    lower, upper = map(int, inputs[0].split("-"))

    return count_valid_passwords(lower, upper, True)
