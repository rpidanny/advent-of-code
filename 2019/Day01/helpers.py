import math


def fuel_required(mass: int) -> int:
    return math.floor(mass / 3) - 2


def fuel_required_recursive(mass: int) -> int:
    fuel = fuel_required(mass)
    if fuel <= 0:
        return 0
    return fuel + fuel_required_recursive(fuel)
