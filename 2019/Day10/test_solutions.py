import os

from solutions import part1, part2

from utils.inputs import get_inputs

current_dir = os.path.dirname(os.path.realpath(__file__))

input = get_inputs(f"{current_dir}/input.txt")
test_input = get_inputs(f"{current_dir}/test.input.txt")
test_input_2 = get_inputs(f"{current_dir}/test.input.2.txt")


class TestPart1:
    def test_with_test_data_1(self):
        assert part1([".#..#", ".....", "#####", "....#", "...##"]) == 8

    def test_with_test_data_2(self):
        assert part1(test_input) == 210

    def test_with_real_data(self):
        assert part1(input) == 329


class TestPart2:
    def test_with_test_data(self):
        assert part2(test_input) == 802
        assert part2(test_input_2, 9) == 1501

    def test_with_real_data(self):
        assert part2(input) == 512
