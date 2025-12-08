import heapq
from collections import defaultdict
from typing import Tuple


class UnionFind:
    def __init__(self):
        self.parents = dict()
        self.rank = defaultdict(lambda: 1)

    def _get_parent(self, point: Tuple[int, int, int]) -> Tuple[int, int, int]:
        if point not in self.parents:
            self.parents[point] = point
        return self.parents.get(point)

    def find(self, point: Tuple[int, int, int]) -> Tuple[int, int, int]:
        p = self._get_parent(point)
        while p != self._get_parent(p):
            p = self._get_parent(self._get_parent(p))
        return p

    def union(self, point1: Tuple[int, int, int], point2: Tuple[int, int, int]) -> int:
        p1 = self.find(point1)
        p2 = self.find(point2)

        if p1 == p2:
            return self.rank[p2]

        if self.rank[p1] > self.rank[p2]:
            self.parents[p2] = p1
            self.rank[p1] += self.rank[p2]
            return self.rank[p1]
        else:
            self.parents[p1] = p2
            self.rank[p2] += self.rank[p1]
            return self.rank[p2]


def part1(lines: list[str], times: int = 1000) -> int:
    coordinates = [tuple(map(int, line.split(","))) for line in lines]

    minHeap, n = [], len(coordinates)
    for i in range(n - 1):
        for j in range(i + 1, n):
            x1, y1, z1 = coordinates[i]
            x2, y2, z2 = coordinates[j]
            heapq.heappush(
                minHeap,
                (
                    (x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2,
                    coordinates[i],
                    coordinates[j],
                ),
            )

    uf = UnionFind()
    for _ in range(times):
        _, p1, p2 = heapq.heappop(minHeap)
        uf.union(p1, p2)

    circuit_sizes = []
    for parent in set(uf.parents.values()):
        circuit_sizes.append(uf.rank[parent] * -1)

    heapq.heapify(circuit_sizes)

    res = 1
    for _ in range(3):
        res *= heapq.heappop(circuit_sizes) * -1

    return res


def part2(lines: list[str]) -> int:
    coordinates = [tuple(map(int, line.split(","))) for line in lines]

    minHeap, n = [], len(coordinates)
    for i in range(n - 1):
        for j in range(i + 1, n):
            x1, y1, z1 = coordinates[i]
            x2, y2, z2 = coordinates[j]
            heapq.heappush(
                minHeap,
                (
                    (x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2,
                    coordinates[i],
                    coordinates[j],
                ),
            )

    uf = UnionFind()
    while True:
        _, p1, p2 = heapq.heappop(minHeap)
        if uf.union(p1, p2) == n:
            return p1[0] * p2[0]
