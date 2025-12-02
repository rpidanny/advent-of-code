from id_checker import IdChecker


def part1(inputs: list[str]) -> int:
    ic = IdChecker()
    res = 0
    for range in inputs[0].split(","):
        s, e = range.split("-")
        res += ic.sum_invalid_ids(s, e)
    return res


def part2(inputs: list[str]) -> int:
    ic = IdChecker()
    res = 0
    for range in inputs[0].split(","):
        s, e = range.split("-")
        res += ic.sum_invalid_ids_v2(s, e)
    return res
