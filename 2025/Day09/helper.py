from typing import Tuple


def do_lines_intersect(
    p1: Tuple[int, int],
    p2: Tuple[int, int],
    q1: Tuple[int, int],
    q2: Tuple[int, int],
) -> bool:
    """
    Return True only if two axis-aligned segments (horizontal/vertical) properly cross
    in the interior of both segments.
    Returns False for:
        - parallel segments (horizontal/horizontal or vertical/vertical)
        - collinear segments (same line), including any overlap or subset
        - touching at endpoints
    """
    # reorder endpoints so p1 <= p2 and q1 <= q2 (lexicographic)
    if p2 < p1:
        p1, p2 = p2, p1
    if q2 < q1:
        q1, q2 = q2, q1

    # detect orientation: horizontal if y same, vertical if x same
    p_horizontal = abs(p1[1] - p2[1]) == 0
    q_horizontal = abs(q1[1] - q2[1]) == 0

    # parallel (including collinear) -> ignore
    if p_horizontal == q_horizontal:
        return False

    # one horizontal, one vertical -> compute intersection point
    if p_horizontal:
        # p is horizontal, q is vertical
        ix, iy = q1[0], p1[1]
        # strictly inside both segments (strict inequalities)
        return (p1[0] < ix < p2[0]) and (q1[1] < iy < q2[1])
    else:
        # p is vertical, q is horizontal
        ix, iy = p1[0], q1[1]
        return (q1[0] < ix < q2[0]) and (p1[1] < iy < p2[1])
