import os

import pytest
from solutions import part1, part2

from utils.inputs import get_inputs

current_dir = os.path.dirname(os.path.realpath(__file__))

input = get_inputs(f"{current_dir}/input.txt")
input_test = get_inputs(f"{current_dir}/input_test.txt")
input_test_2 = get_inputs(f"{current_dir}/input_test_2.txt")
input_test_3 = get_inputs(f"{current_dir}/input_test_3.txt")
input_test_4 = get_inputs(f"{current_dir}/input_test_4.txt")


@pytest.mark.skip(reason="not implemented")
class TestPart1:
    def test_with_test_data(self):
        assert part1(input_test, 4) == "01029498"
        assert part1(input_test_2, 100) == "24176176"
        assert part1(input_test_3, 100) == "52432133"

    def test_with_real_data(self):
        assert part1(input) == "68317988"


class TestPart2:
    def test_with_test_data(self):
        assert part2(input_test_4, 100) == "84462026"

    @pytest.mark.skip(reason="not implemented")
    def test_with_real_data(self):
        assert part2(input) == 2
