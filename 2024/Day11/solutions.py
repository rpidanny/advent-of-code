from plutonian_pebbles import PlutonianPebbles


def part1(inputs: list[str]) -> int:
    pp = PlutonianPebbles(inputs)
    return pp.simulate(25)


def part2(inputs: list[str]) -> int:
    pp = PlutonianPebbles(inputs)
    return pp.simulate(75)
