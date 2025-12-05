def part1(inputs: list[str]) -> int:
    ranges, ingredients, is_ingredient = [], [], False
    for line in inputs:
        if line == "":
            is_ingredient = True
            continue
        if is_ingredient:
            ingredients.append(int(line))
        else:
            ranges.append(list(map(int, line.split("-"))))

    def is_fresh(val: int) -> bool:
        for s, e in ranges:
            if s <= val <= e:
                return True
        return False

    count = 0
    for ingredient in ingredients:
        if is_fresh(ingredient):
            count += 1
    return count


def part2(inputs: list[str]) -> int:
    ranges, merged_ranges = [], []
    for line in inputs:
        if line == "":
            break
        ranges.append(list(map(int, line.split("-"))))

    ranges.sort()

    # merge the overlapping ranges so that we eliminate duplicates
    for s, e in ranges:
        if not merged_ranges or s > merged_ranges[-1][1]:
            merged_ranges.append([s, e])
        else:
            prevStart, prevEnd = merged_ranges[-1]
            merged_ranges[-1] = [prevStart, max(prevEnd, e)]

    count = 0
    for s, e in merged_ranges:
        count += (e - s) + 1

    return count
