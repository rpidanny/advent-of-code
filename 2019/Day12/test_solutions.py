import os

from solutions import part1, part2

from utils.inputs import get_inputs

current_dir = os.path.dirname(os.path.realpath(__file__))

input = get_inputs(f"{current_dir}/input.txt")
input_test = get_inputs(f"{current_dir}/input_test.txt")
input_test_2 = get_inputs(f"{current_dir}/input_test_2.txt")


class TestPart1:
    def test_with_test_data(self):
        assert part1(input_test, 10) == 179

    def test_with_test_data_2(self):
        assert part1(input_test_2, 100) == 1940

    def test_with_real_data(self):
        assert part1(input) == 8742


class TestPart2:
    def test_with_test_data(self):
        assert part2(input_test) == 2772

    def test_with_test_data_2(self):
        assert part2(input_test_2) == 4686774924

    def test_with_real_data(self):
        assert part2(input) == 325433763467176
