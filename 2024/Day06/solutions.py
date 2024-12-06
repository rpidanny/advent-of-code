from guard_gallivant import GuardGallivant


def part1(inputs: list[str]) -> int:
    gg = GuardGallivant(inputs)
    return len(gg.get_distinct_visited_positions())


def part2(inputs: list[str]) -> int:
    gg = GuardGallivant(inputs)
    return gg.get_num_distinct_visited_positions_with_loop()
