from typing import Dict


class PrinterQueue:
    def __init__(self, lines: list[str]):
        self.ordering_rules, self.updates = self.parse_input(lines)

    def parse_input(self, lines: list[int]) -> tuple[list[list[int]], list[list[int]]]:
        ordering_rules = []
        updates = []
        is_updates = False
        for line in lines:
            if line == "":
                is_updates = True
                continue

            if is_updates:
                updates.append(list(map(int, line.split(","))))
            else:
                ordering_rules.append(list(map(int, line.split("|"))))
        return ordering_rules, updates

    def get_correct_updates(self) -> list[int]:
        correct_updates = []
        for update in self.updates:
            dt = {page: idx for idx, page in enumerate(update)}
            if self.is_correct_update(dt):
                correct_updates.append(update)
        return correct_updates

    def get_incorrect_updates(self) -> list[int]:
        incorrect_updates = []
        for update in self.updates:
            dt = {page: idx for idx, page in enumerate(update)}
            if not self.is_correct_update(dt):
                incorrect_updates.append(update)
        return incorrect_updates

    def is_correct_update(self, dt: Dict[int, int]) -> bool:
        for rule in self.ordering_rules:
            a, b = rule
            if a not in dt or b not in dt:
                continue
            if dt[a] >= dt[b]:
                return False
        return True

    def get_sum_of_median(self, updates: list[int]) -> int:
        return sum(self.get_median(update) for update in updates)

    def get_median(self, update: list[int]) -> int:
        idx = len(update) // 2
        return update[idx]

    def fix_single_page(self, dt: Dict[int, int]) -> list[int]:
        for rule in self.ordering_rules:
            a, b = rule
            if a not in dt or b not in dt:
                continue
            if dt[a] >= dt[b]:
                dt[a], dt[b] = dt[b], dt[a]
        return dt

    def fix_incorrect_update(self, update: list[int]) -> list[int]:
        dt = {page: idx for idx, page in enumerate(update)}
        while not self.is_correct_update(dt):
            dt = self.fix_single_page(dt)

        return [k for k, v in sorted(dt.items(), key=lambda item: item[1])]
