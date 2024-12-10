from hiking_trail import HikingTrail


def part1(inputs: list[str]) -> int:
    ht = HikingTrail(inputs)
    return ht.get_sum_of_trail_head_scores()


def part2(inputs: list[str]) -> int:
    ht = HikingTrail(inputs)
    return ht.get_sum_of_trail_head_ratings()
