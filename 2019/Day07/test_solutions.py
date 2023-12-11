import os

import pytest
from solutions import part1, part2

from utils.inputs import get_inputs

current_dir = os.path.dirname(os.path.realpath(__file__))

input = get_inputs(f"{current_dir}/input.txt")


@pytest.mark.skip(reason="completed")
class TestPart1:
    def test_with_test_data_1(self):
        assert part1(["3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0"]) == 43210
        assert (
            part1(
                [
                    "3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0"
                ]
            )
            == 54321
        )
        assert (
            part1(
                [
                    "3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0"
                ]
            )
            == 65210
        )

    def test_with_real_data(self):
        assert part1(input) == 75228


class TestPart2:
    def test_with_test_data(self):
        assert (
            part2(
                [
                    "3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5"
                ]
            )
            == 139629729
        )

    @pytest.mark.skip(reason="not implemented")
    def test_with_real_data(self):
        assert part2(input) == 2
