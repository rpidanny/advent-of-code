import os
import sys

sys.path.append("../")

from helpers import run_program
from solutions import part1, part2
from utils.inputs import get_inputs

current_dir = os.path.dirname(os.path.realpath(__file__))

input = get_inputs(f"{current_dir}/input.txt")


class TestPart1:
    def test_run_program(self):
        assert run_program([1, 0, 0, 0, 99]) == [2, 0, 0, 0, 99]
        assert run_program([2, 3, 0, 3, 99]) == [2, 3, 0, 6, 99]
        assert run_program([2, 4, 4, 5, 99, 0]) == [2, 4, 4, 5, 99, 9801]
        assert run_program([1, 1, 1, 4, 99, 5, 6, 0, 99]) == [
            30,
            1,
            1,
            4,
            2,
            5,
            6,
            0,
            99,
        ]

    def test_with_real_data(self):
        assert part1(input) == 3765464


class TestPart2:
    def test_with_real_data(self):
        assert part2(input) == 7610
