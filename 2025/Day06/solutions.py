from helper import parseInput


def part1(lines: list[str]) -> int:
    columns, total = parseInput(lines), 0

    for col in columns:
        operation = col[-1][0]
        res = 0 if operation == "+" else 1

        for r in range(0, len(col) - 1):
            num = int(col[r])
            if operation == "+":
                res += num
            else:
                res *= num
        total += res

    return total


def part2(lines: list[str]) -> int:
    columns, total = parseInput(lines), 0

    for col in columns:
        operation = col[-1][0]
        res = 0 if operation == "+" else 1

        # go over the digit column to create the number and perform operation
        for digit_index in range(len(col[0])):
            num = []
            # ignore the last row since it's for the operator
            for r in range(len(col) - 1):
                if col[r][digit_index] != " ":
                    num.append(col[r][digit_index])

            if operation == "+":
                res += int("".join(num))
            else:
                res *= int("".join(num))

        total += res
    return total
