from ceres_search import CeresSearch


def part1(inputs: list[str]) -> int:
    cs = CeresSearch(inputs)
    return cs.search_xmas()


def part2(inputs: list[str]) -> int:
    cs = CeresSearch(inputs)
    return cs.search_x_mas_patterns()
