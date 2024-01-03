import os

import pytest
from solutions import part1, part2

from utils.inputs import get_inputs

current_dir = os.path.dirname(os.path.realpath(__file__))

input = get_inputs(f"{current_dir}/input.txt")
input_test = get_inputs(f"{current_dir}/input_test.txt")
input_test_2 = get_inputs(f"{current_dir}/input_test_2.txt")
input_test_3 = get_inputs(f"{current_dir}/input_test_3.txt")


# @pytest.mark.skip(reason="not implemented")
class TestPart1:
    @pytest.mark.skip(reason="not implemented")
    def test_with_test_data(self):
        assert part1(input_test) == 31

    # @pytest.mark.skip(reason="not implemented")
    def test_with_test_data_2(self):
        assert part1(input_test_2) == 165

    @pytest.mark.skip(reason="not implemented")
    def test_with_test_data_3(self):
        assert part1(input_test_3) == 2210736

    @pytest.mark.skip(reason="not implemented")
    def test_with_real_data(self):
        assert part1(input) == 485720


class TestPart2:
    # @pytest.mark.skip(reason="not implemented")
    def test_with_test_data_3(self):
        assert part2(input_test_3) == 460664

    @pytest.mark.skip(reason="not implemented")
    def test_with_real_data(self):
        assert part2(input) == 2
