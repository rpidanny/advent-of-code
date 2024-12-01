from historian_hysteria import HistorianHysteria


def part1(inputs: list[str]) -> int:
    hh = HistorianHysteria(inputs)
    return hh.get_total_distances_btn_location_ids()


def part2(inputs: list[str]) -> int:
    hh = HistorianHysteria(inputs)
    return hh.get_similarity_score()
