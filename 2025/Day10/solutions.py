from math import inf
from typing import List, Tuple

import numpy as np
from scipy.optimize import Bounds, LinearConstraint, milp


def parseLine(line: str) -> Tuple[str, List[int], list[int]]:
    tmp = line.split(" ")
    indicator_lights = list(tmp[0][1:-1])
    buttons = list(map(lambda b: list(map(int, b[1:-1].split(","))), tmp[1:-1]))
    joltages = list(map(int, tmp[-1][1:-1].split(",")))
    return indicator_lights, buttons, joltages


def part1(lines: list[str]) -> int:
    total = 0

    for line in lines:
        indicator_lights, buttons, _ = parseLine(line)
        n = len(buttons)

        def are_all_lights_off() -> bool:
            for light in indicator_lights:
                if light != ".":
                    return False
            return True

        def toggle(btn: int):
            if indicator_lights[btn] == ".":
                indicator_lights[btn] = "#"
            else:
                indicator_lights[btn] = "."

        def dfs(i: int, btn_presses: int) -> int:
            nonlocal indicator_lights
            if are_all_lights_off():
                return btn_presses
            if i == n:
                return inf

            # case 1: skip current button
            res = dfs(i + 1, btn_presses)

            # case 2: use current button
            for btn in buttons[i]:
                toggle(btn)

            res = min(res, dfs(i + 1, btn_presses + 1))

            # 2.1 backtrack
            for btn in buttons[i]:
                toggle(btn)

            return res

        total += dfs(0, 0)
    return total


def solve_min_nonnegative_integer(buttons: list, joltages: list):
    """
    Solves the linear system Ax = b for non-negative integers x
    minimizing sum(x).

    A is constructed from 'buttons' (the effect of each button).
    b is 'joltages' (the target values).
    """
    num_vars = len(buttons)
    num_eqs = len(joltages)

    # 1. Objective Function: Minimize sum(x)
    # The solver minimizes c @ x. To minimize sum, set all c = 1.
    c = np.ones(num_vars)

    # 2. Build the Constraint Matrix A
    # A[i][j] = 1 if button j affects equation i, else 0
    A = np.zeros((num_eqs, num_vars))
    for j, affected_indices in enumerate(buttons):
        for i in affected_indices:
            if 0 <= i < num_eqs:
                A[i, j] = 1

    # 3. Define Constraints
    # Equality constraint: Ax = b
    # In milp, we specify lower and upper bounds for the constraint: b_l <= Ax <= b_u
    # For equality, b_l = b_u = joltages
    b = np.array(joltages)
    constraints = LinearConstraint(A, lb=b, ub=b)

    # 4. Define Variable Bounds and Integrality
    # x >= 0 (lower bound 0, upper bound infinity)
    bounds = Bounds(lb=0, ub=np.inf)

    # integrality=1 means the variable must be an integer
    integrality = np.ones(num_vars)

    # 5. Solve
    res = milp(c=c, constraints=constraints, bounds=bounds, integrality=integrality)

    if not res.success:
        raise ValueError("No solution found (infeasible or unbounded)")

    # Result values might be floats like 1.0, 2.0 due to solver precision; round them.
    solution_integers = np.round(res.x).astype(int)

    return solution_integers


def part2(lines: list[str]) -> int:
    total = 0

    for line in lines:
        _, buttons, joltages = parseLine(line)

        best_vals = solve_min_nonnegative_integer(buttons, joltages)
        # print(f"Solution: {best_vals} | Sum: {sum(best_vals)}")
        total += sum(best_vals)

    return total
