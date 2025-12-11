from collections import defaultdict
from functools import lru_cache


def parseInput(lines: list[str]):
    adjList = defaultdict(list)
    for line in lines:
        src, dsts = line.split(": ")
        adjList[src] = dsts.split(" ")
    return adjList


def part1(lines: list[str]) -> int:
    adjList = parseInput(lines)

    @lru_cache()
    def dfs(node: str) -> int:
        if node == "out":
            return 1
        count = 0
        for dst in adjList[node]:
            count += dfs(dst)
        return count

    return dfs("you")


def part2(lines: list[str]) -> int:
    adjList = parseInput(lines)

    @lru_cache(maxsize=None)
    def dfs(node: str, visited_dac: bool, visited_fft: bool) -> int:
        if node == "out":
            return int(visited_dac and visited_fft)

        count = 0
        for dst in adjList[node]:
            count += dfs(dst, visited_dac or dst == "dac", visited_fft or dst == "fft")

        return count

    return dfs("svr", False, False)
