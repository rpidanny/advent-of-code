from reactor import Reactor


def part1(inputs: list[str]) -> int:
    reactor = Reactor(inputs)
    ore = reactor.get_ore("FUEL", 1)
    return ore


def part2(inputs: list[str], ore=1000000000000) -> int:
    reactor = Reactor(inputs)
    return reactor.get_fuel_from_ore(ore)
