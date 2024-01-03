from reactor import Reactor


def part1(inputs: list[str]) -> int:
    reactor = Reactor(inputs)
    print(reactor.output_map)
    ore = reactor.get_ore("FUEL", 1)

    print(reactor.chemicals)
    return ore


def part2(inputs: list[str], ore=1000000000000) -> int:
    reactor = Reactor(inputs)
    return reactor.get_ore_for_fuel(ore)
