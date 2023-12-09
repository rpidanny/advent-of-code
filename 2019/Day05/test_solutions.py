import os

import pytest
from helpers import run_program
from solutions import part1, part2

from utils.inputs import get_inputs

current_dir = os.path.dirname(os.path.realpath(__file__))

input = get_inputs(f"{current_dir}/input.txt")
input_test = get_inputs(f"{current_dir}/input_test.txt")


class TestPart1:
    def test_run_program(self):
        assert run_program([1002, 4, 3, 4, 33]) == [1002, 4, 3, 4, 99]
        assert run_program([1101, 100, -1, 4, 0]) == [1101, 100, -1, 4, 99]

    def test_with_real_data(self):
        assert part1(input) == 9938601


class TestPart2:
    def test_run_program_equal_8(self):
        ip = [8]
        op = []
        run_program([3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8], ip, op)
        assert op.pop() == 1

    def test_run_program_not_equal_8(self):
        ip = [7]
        op = []
        run_program([3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8], ip, op)
        assert op.pop() == 0

    def test_with_test_data(self):
        assert part2(input_test) == 999

    @pytest.mark.skip(reason="not implemented")
    def test_with_real_data(self):
        assert part2(input) == 4283952
