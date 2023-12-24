from helpers import MonitoringStation


def part1(inputs: list[str]) -> int:
    ms = MonitoringStation(inputs)
    return ms.get_max_viewable_astroids()[2]


def part2(inputs: list[str]) -> int:
    ms = MonitoringStation(inputs)
    return ms.get_200th_astroid()
