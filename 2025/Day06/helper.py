from typing import List


def parseInput(lines: List[str]) -> List[List[str]]:
    columns, indices = [], []

    # get the indices of the operators since those indices are
    # where we can split the string to get the numbers
    for i, char in enumerate(lines[-1]):
        if char == "*" or char == "+":
            indices.append(i)
    indices.append(len(lines[0]) + 1)

    for i, line in enumerate(lines):
        for j in range(len(indices) - 1):
            num = line[indices[j] : indices[j + 1] - 1]
            if i == 0:
                columns.append([num])
            else:
                columns[j].append(num)

    return columns
