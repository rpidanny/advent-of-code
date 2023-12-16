import math


def get_astroid_locations(input) -> list[int, int]:
    astroid_locations = []
    for row in range(len(input)):
        for col in range(len(input[row])):
            if input[row][col] == "#":
                astroid_locations.append([row, col])
    return astroid_locations


def distance_between_astroids(astroid1: [int, int], astroid2: [int, int]) -> int:
    return math.sqrt(
        (astroid1[0] - astroid2[0]) ** 2 + (astroid1[1] - astroid2[1]) ** 2
    )
