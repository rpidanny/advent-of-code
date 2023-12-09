from helpers import calculate_steps, manhattan_distance


def part1(inputs: list[str]) -> int:
    wire1_path, wire2_path = map(lambda line: line.split(","), inputs)
    wire1_points = set(calculate_steps(wire1_path))
    wire2_points = set(calculate_steps(wire2_path))
    intersections = wire1_points.intersection(wire2_points)

    return min(manhattan_distance((0, 0), pos) for pos in intersections)


def part2(inputs: list[str]) -> int:
    wire1_path, wire2_path = map(lambda line: line.split(","), inputs)
    wire1_steps = calculate_steps(wire1_path)
    wire2_steps = calculate_steps(wire2_path)
    intersections = set(wire1_steps.keys()).intersection(set(wire2_steps.keys()))

    return min(wire1_steps[pos] + wire2_steps[pos] for pos in intersections)
