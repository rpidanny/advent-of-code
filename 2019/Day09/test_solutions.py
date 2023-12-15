import os

from solutions import part1, part2

from utils.inputs import get_inputs

current_dir = os.path.dirname(os.path.realpath(__file__))

input = get_inputs(f"{current_dir}/input.txt")


# Basic Operation Of System Test
# It will perform a series of checks on each opcode, output any opcodes (and the associated parameter modes) that seem to be functioning incorrectly
class TestPart1BoostTest:
    def test_with_real_data(self):
        assert part1(input) == 2738720997


class TestPart2BoostSensorMode:
    def test_with_real_data(self):
        assert part2(input) == 50894
