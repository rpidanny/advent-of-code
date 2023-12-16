import os

import pytest
from solutions import part1, part2

from utils.inputs import get_inputs

current_dir = os.path.dirname(os.path.realpath(__file__))

input = get_inputs(f"{current_dir}/input.txt")


class TestPart1:
    def test_with_test_data(self):
        assert part1([".#..#", ".....", "#####", "....#", "...##"]) == 8

    @pytest.mark.skip(reason="not implemented")
    def test_with_real_data(self):
        assert part1(input) == 1


class TestPart2:
    @pytest.mark.skip(reason="not implemented")
    def test_with_test_data(self):
        assert part2(["input_test"]) == 2

    @pytest.mark.skip(reason="not implemented")
    def test_with_real_data(self):
        assert part2(input) == 2
