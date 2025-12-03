from typing import List


def part1(inputs: list[str]) -> int:
    total = 0

    for line in inputs:
        digits = [ord(c) - 48 for c in line]

        overall_max = max(digits)
        first_max_idx = digits.index(overall_max)

        if digits[-1] == overall_max:
            tens = max(digits[:-1])
            ones = digits[-1]
        else:
            tens = overall_max
            ones = max(digits[first_max_idx + 1 :])

        total += tens * 10 + ones

    return total


def part2(inputs: list[str]) -> int:
    total = 0
    for line in inputs:
        n, target_len = len(line), 12
        next_greater = [n] * n
        stack: List[int] = []  # will store indices in strictly decreasing-by-char order

        # Build next_greater using a monotonic stack (O(n))
        for i in range(n - 1, -1, -1):
            while stack and line[stack[-1]] <= line[i]:
                stack.pop()
            next_greater[i] = stack[-1] if stack else n
            stack.append(i)

        i = 0
        picked: List[str] = []
        while i < n and len(picked) < target_len:
            next_idx = next_greater[i]

            # how many chars remain from the next_greater index to the end
            remaining_after_next = n - next_idx
            need = target_len - len(picked)

            # If jumping to next_idx still leaves enough characters to reach target,
            # prefer the jump (skip current char and everything until next_idx)
            if remaining_after_next >= need:
                i = next_idx
            else:
                picked.append(line[i])
                i += 1

        total += int("".join(picked))
    return total
