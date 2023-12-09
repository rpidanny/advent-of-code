from typing import Tuple


def manhattan_distance(pt1: Tuple[int, int], pt2: Tuple[int, int]) -> int:
    return abs(pt1[0] - pt2[0]) + abs(pt1[1] - pt2[1])


def move(pos: Tuple[int, int], dir: str) -> Tuple[int, int]:
    moves = {"U": (0, 1), "D": (0, -1), "L": (-1, 0), "R": (1, 0)}
    return (pos[0] + moves[dir][0], pos[1] + moves[dir][1])


def calculate_steps(wire_path: list[str]) -> dict[Tuple[int, int], int]:
    steps = {}
    current_pos = (0, 0)
    step_count = 0

    for dir in wire_path:
        for _ in range(int(dir[1:])):
            step_count += 1
            current_pos = move(current_pos, dir[0])
            steps[current_pos] = step_count

    return steps
