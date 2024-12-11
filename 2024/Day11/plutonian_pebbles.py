from functools import lru_cache


class PlutonianPebbles:
    def __init__(self, lines: list[str]):
        self.pebbles = list(map(int, lines[0].split()))

    @lru_cache(maxsize=None)
    def _handle_pebble(self, pebble: int, generations: int) -> int:
        if generations == 0:
            return 1
        if pebble == 0:
            return self._handle_pebble(1, generations - 1)

        pebble_str = str(pebble)
        if len(pebble_str) % 2 == 0:
            mid = len(pebble_str) // 2
            first_val, second_val = int(pebble_str[:mid]), int(pebble_str[mid:])
            return self._handle_pebble(
                first_val, generations - 1
            ) + self._handle_pebble(second_val, generations - 1)

        return self._handle_pebble(pebble * 2024, generations - 1)

    def simulate(self, generations: int) -> int:
        return sum(self._handle_pebble(pebble, generations) for pebble in self.pebbles)
