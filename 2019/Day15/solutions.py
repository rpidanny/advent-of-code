from map import Map


def part1(inputs: list[str], visualize=False) -> int:
    m = Map(inputs, visualize)
    return m.get_min_steps_to_oxygen()


def part2(inputs: list[str], visualize=False) -> int:
    m = Map(inputs, visualize)
    return m.get_min_time_to_fill()
