import os

from solutions import part1, part2

from utils.inputs import get_inputs

current_dir = os.path.dirname(os.path.realpath(__file__))

input = get_inputs(f"{current_dir}/input.txt")
input_test = get_inputs(f"{current_dir}/input_test.txt")


class TestPart1:
    def test_with_test_data(self):
        assert part1(input_test) == 161

    def test_with_real_data(self):
        assert part1(input) == 182619815


class TestPart2:
    def test_with_test_data(self):
        assert part2(input_test) == 48

    def test_with_real_data(self):
        assert part2(input) == 80747545
