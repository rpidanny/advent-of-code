def part1(inputs: list[str], start_pos: int = 50) -> int:
    pos, count = start_pos, 0

    for line in inputs:
        dirc, times = line[:1], int(line[1:])
        if dirc == "L":
            pos = (pos - times) % 100
        else:
            pos = (pos + times) % 100

        if pos == 0:
            count += 1

    return count


def part2(inputs: list[str], start_pos: int = 50) -> int:
    pos, count = start_pos, 0

    for line in inputs:
        dirc, times = line[:1], int(line[1:])
        if dirc == "L":
            # we need i in [1..times] such that (pos - i) % 100 == 0  -> i ≡ pos (mod 100)
            i = pos % 100
            pos = (pos - times) % 100
        else:  # "R"
            # we need i in [1..times] such that (pos + i) % 100 == 0 -> i ≡ (100 - pos) (mod 100)
            i = (100 - pos) % 100
            pos = (pos + times) % 100

        if i == 0:
            i = 100  # next time we hit 0 is after 100 steps
        if i <= times:
            count += ((times - i) // 100) + 1

    return count
