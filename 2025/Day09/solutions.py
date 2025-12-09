import heapq
from functools import lru_cache
from typing import Tuple

from helper import do_lines_intersect
from shapely import Point, Polygon


def part1(lines: list[str]) -> int:
    area = 0
    points = [list(map(int, line.split(","))) for line in lines]
    m = len(points)
    for i in range(m - 1):
        for j in range(i + 1, m):
            x1, y1 = points[i]
            x2, y2 = points[j]
            area = max(area, (abs(x1 - x2) + 1) * (abs(y1 - y2) + 1))

    return area


def part2(lines: list[str]) -> int:
    points = [tuple(map(int, line.split(","))) for line in lines]
    m = len(points)

    # poly = Polygon(points)

    @lru_cache(maxsize=None)
    def point_in_polygon(x: int, y: int) -> bool:
        # return poly.covers(Point(x, y))

        inside = False
        x1, y1 = points[-1]
        for x2, y2 in points:
            # 1. Check if point is exactly on the segment
            if min(x1, x2) <= x <= max(x1, x2) and min(y1, y2) <= y <= max(y1, y2):
                return True

            # 2. Ray-casting:
            #    - y between y1 and y2 (excluding top endpoint)
            #    - x is to the left of x-intercept
            if (y1 > y) != (y2 > y):
                x_intersect = x1 + (x2 - x1) * (y - y1) / (y2 - y1)
                if x < x_intersect:
                    inside = not inside
            x1, y1 = x2, y2
        return inside

    def is_line_segment_valid(p1: Tuple[int, int], p2: Tuple[int, int]) -> bool:
        q1 = points[-1]
        for q2 in points:
            if do_lines_intersect(p1, p2, q1, q2):
                return False
            q1 = q2
        return True

    def is_rectangle_valid(p1: Tuple[int, int], p2: Tuple[int, int]) -> bool:
        (x1, y1), (x2, y2) = p1, p2
        p3, p4 = (x1, y2), (x2, y1)

        # 1. check if the other 2 points of the rectangle lies inside the polygon
        for x, y in [p3, p4]:
            if not point_in_polygon(x, y):
                return False

        # 2. check if all 4 sides of the rectangle are valid i.e. doesn't have intersections
        for p, q in [[p1, p3], [p1, p4], [p3, p2], [p4, p2]]:
            if not is_line_segment_valid(p, q):
                return False

        return True

    # Using max heap to find the first largest valid rectangle is faster
    # than brute forcing all rectangles
    heap = []
    for i in range(m - 1):
        for j in range(i + 1, m):
            p1, p2 = points[i], points[j]
            curr_area = (abs(p1[0] - p2[0]) + 1) * (abs(p1[1] - p2[1]) + 1)
            heap.append((-curr_area, p1, p2))

    heapq.heapify(heap)

    while True:
        curr_area, p1, p2 = heapq.heappop(heap)
        if is_rectangle_valid(p1, p2):
            return -curr_area
