from functools import lru_cache
from typing import Tuple


def do_lines_intersect(
    p1: Tuple[int, int],
    p2: Tuple[int, int],
    q1: Tuple[int, int],
    q2: Tuple[int, int],
) -> bool:
    px_min, px_max = min(p1[0], p2[0]), max(p1[0], p2[0])
    py_min, py_max = min(p1[1], p2[1]), max(p1[1], p2[1])
    qx_min, qx_max = min(q1[0], q2[0]), max(q1[0], q2[0])
    qy_min, qy_max = min(q1[1], q2[1]), max(q1[1], q2[1])

    return qx_max > px_min and qx_min < px_max and qy_max > py_min and qy_min < py_max
