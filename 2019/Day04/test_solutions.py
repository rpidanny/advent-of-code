import os

from helper import is_valid_password
from solutions import part1, part2

from utils.inputs import get_inputs

current_dir = os.path.dirname(os.path.realpath(__file__))

input = get_inputs(f"{current_dir}/input.txt")


class TestPart1:
    def test_is_valid_password(self):
        assert is_valid_password(111111, False) == True
        assert is_valid_password(223450, False) == False
        assert is_valid_password(123789, False) == False
        assert is_valid_password(123444, False) == True

    def test_with_real_data(self):
        assert part1(input) == 2081


class TestPart2:
    def test_is_valid_password(self):
        assert is_valid_password(111111, True) == False
        assert is_valid_password(223450, True) == False
        assert is_valid_password(123789, True) == False
        assert is_valid_password(123444, True) == False
        assert is_valid_password(112233, True) == True
        assert is_valid_password(111122, True) == True

    def test_with_real_data(self):
        assert part2(input) == 1411
