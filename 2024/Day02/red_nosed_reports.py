class RedNosedReports:
    def __init__(self, inputs: list[str]) -> None:
        self._inputs = inputs

    def _is_safe(self, levels: list[int]) -> bool:
        """
        Check if the levels are safe based on the rules:
        - All increasing or all decreasing
        - Differences are between 1 and 3
        """
        differences = [levels[i + 1] - levels[i] for i in range(len(levels) - 1)]
        return all(1 <= diff <= 3 for diff in differences) or all(
            -3 <= diff <= -1 for diff in differences
        )

    def _count_safe_reports(self, allow_removal: bool = False) -> int:
        safe_count = 0
        for line in self._inputs:
            levels = list(map(int, line.split()))
            if self._is_safe(levels):
                safe_count += 1
            elif allow_removal:
                safe_count += any(
                    self._is_safe(levels[:i] + levels[i + 1 :])
                    for i in range(len(levels))
                )
        return safe_count

    def get_num_of_safe_reports(self) -> int:
        return self._count_safe_reports()

    def get_num_of_safe_reports_with_removal(self) -> int:
        return self._count_safe_reports(allow_removal=True)
