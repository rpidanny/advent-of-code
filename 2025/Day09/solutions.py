def part1(lines: list[str]) -> int:
    points = [list(map(int, line.split(","))) for line in lines]

    area, m = 0, len(points)
    for i in range(m - 1):
        for j in range(i + 1, m):
            p1, p2 = points[i], points[j]
            area = max(area, (abs(p1[0] - p2[0]) + 1) * (abs(p1[1] - p2[1]) + 1))

    return area


def do_lines_intersect(
    p1: tuple[int, int],
    p2: tuple[int, int],
    q1: tuple[int, int],
    q2: tuple[int, int],
) -> bool:
    px_min, px_max = min(p1[0], p2[0]), max(p1[0], p2[0])
    py_min, py_max = min(p1[1], p2[1]), max(p1[1], p2[1])
    qx_min, qx_max = min(q1[0], q2[0]), max(q1[0], q2[0])
    qy_min, qy_max = min(q1[1], q2[1]), max(q1[1], q2[1])

    return qx_max > px_min and qx_min < px_max and qy_max > py_min and qy_min < py_max


def part2(lines: list[str]) -> int:
    points = [list(map(int, line.split(","))) for line in lines]
    m = len(points)

    def is_rectangle_valid(p1: tuple[int, int], p2: tuple[int, int]) -> bool:
        q1 = points[-1]
        for q2 in points:
            if do_lines_intersect(p1, p2, q1, q2):
                return False
            q1 = q2
        return True

    area = 0
    for i in range(m - 1):
        for j in range(i + 1, m):
            p1, p2 = points[i], points[j]
            curr_area = (abs(p1[0] - p2[0]) + 1) * (abs(p1[1] - p2[1]) + 1)
            if curr_area > area and is_rectangle_valid(p1, p2):
                area = curr_area
    return area
