from collections import Counter


class HistorianHysteria:
    def __init__(self, data: list[str]):
        self.left, self.right = self._parse_data(data)

    @staticmethod
    def _parse_data(data: list[str]) -> tuple[list[int], list[int]]:
        left, right = zip(*(map(int, line.split("   ")) for line in data))
        return list(left), list(right)

    def get_total_distances_btn_location_ids(self) -> int:
        return sum(abs(l - r) for l, r in zip(sorted(self.left), sorted(self.right)))

    def get_similarity_score(self) -> int:
        right_occurrences = Counter(self.right)
        return sum(l * right_occurrences.get(l, 0) for l in self.left)
