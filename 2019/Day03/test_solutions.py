import os

import pytest
from solutions import part1, part2

from utils.inputs import get_inputs

current_dir = os.path.dirname(os.path.realpath(__file__))

input = get_inputs(f"{current_dir}/input.txt")


class TestPart1:
    def test_with_test_data(self):
        assert (
            part1(
                [
                    "R8,U5,L5,D3",
                    "U7,R6,D4,L4",
                ]
            )
            == 6
        )
        assert (
            part1(
                [
                    "R75,D30,R83,U83,L12,D49,R71,U7,L72",
                    "U62,R66,U55,R34,D71,R55,D58,R83",
                ]
            )
            == 159
        )
        assert (
            part1(
                [
                    "R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51",
                    "U98,R91,D20,R16,D67,R40,U7,R15,U6,R7",
                ]
            )
            == 135
        )

    def test_with_real_data(self):
        assert part1(input) == 2193


class TestPart2:
    def test_with_test_data(self):
        assert (
            part2(
                [
                    "R8,U5,L5,D3",
                    "U7,R6,D4,L4",
                ]
            )
            == 30
        )
        assert (
            part2(
                [
                    "R75,D30,R83,U83,L12,D49,R71,U7,L72",
                    "U62,R66,U55,R34,D71,R55,D58,R83",
                ]
            )
            == 610
        )
        assert (
            part2(
                [
                    "R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51",
                    "U98,R91,D20,R16,D67,R40,U7,R15,U6,R7",
                ]
            )
            == 410
        )

    def test_with_real_data(self):
        assert part2(input) == 63526
