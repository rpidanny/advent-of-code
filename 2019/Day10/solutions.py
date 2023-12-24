from monitoring_station import MonitoringStation


def part1(inputs: list[str]) -> int:
    ms = MonitoringStation(inputs)
    return len(ms.get_max_viewable_asteroids()[1])


def part2(inputs: list[str], n=200) -> int:
    ms = MonitoringStation(inputs)
    x, y = ms.get_nth_vaporized_asteroid(n)
    return x * 100 + y
