class BridgeRepair:
    def __init__(self, lines: list[str]):
        self.equations = [
            (int(parts[0]), list(map(int, parts[1].split())))
            for parts in (line.split(": ") for line in lines)
        ]

    def is_valid_equation(
        self,
        equation: tuple[int, list[int]],
        idx: int,
        result: int,
        concat: bool,
    ) -> bool:
        if result > equation[0]:
            return False
        if idx >= len(equation[1]):
            return equation[0] == result
        next_val = equation[1][idx]
        return (
            self.is_valid_equation(equation, idx + 1, result + next_val, concat)
            or self.is_valid_equation(equation, idx + 1, result * next_val, concat)
            or (
                concat
                and self.is_valid_equation(
                    equation,
                    idx + 1,
                    int(f"{result}{next_val}"),
                    concat,
                )
            )
        )

    def get_total_calibration(self, concat=False) -> int:
        return sum(
            target
            for target, numbers in self.equations
            if self.is_valid_equation((target, numbers), 1, numbers[0], concat)
        )
