from functools import cache


class FlawedFrequencyTransmission:
    def __init__(self, signal):
        self.original_signal = list(map(int, list(signal)))
        self.base_pattern = [0, 1, 0, -1]

    @cache
    def _get_pattern(self, i):
        pattern = []
        for element in self.base_pattern:
            pattern.extend([element] * (i + 1))
        return pattern

    @cache
    def _get_multiplier(self, i: int, j: int) -> int:
        pattern = self._get_pattern(i)
        idx = (j + 1) % len(pattern)
        return pattern[idx]

    def _get_digit(self, i: int, signal: list[int]):
        num = 0
        for j, digit in enumerate(signal):
            num += digit * self._get_multiplier(i, j)
        return abs(num) % 10

    def apply(self, times=1, offset=0) -> str:
        signal = self.original_signal

        start_idx = 0
        if offset > 0:
            start_idx = int("".join(map(str, self.original_signal[:offset])))

        seen = set()
        seen.add(tuple(signal))

        for _ in range(times):
            signal = [
                self._get_digit(i, signal) for i in range(len(self.original_signal))
            ]
            if tuple(signal) in seen:
                print("Pattern")
            seen.add(tuple(signal))

        # return "".join(map(str, signal))[start_idx:8]
        print(f"Full response: {''.join(map(str, signal))}")
        return "".join(map(str, signal))
