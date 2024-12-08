from resonant_collinearity import ResonantCollinearity


def part1(inputs: list[str]) -> int:
    rc = ResonantCollinearity(inputs)
    return rc.count_antinode()


def part2(inputs: list[str]) -> int:
    rc = ResonantCollinearity(inputs)
    return rc.count_antinode_with_harmonics()
