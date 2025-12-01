import os
import sys

sys.path.append(".")

from solutions import part1, part2

from utils.inputs import get_inputs
from utils.profiling import profile_run

if __name__ == "__main__":
    input_path = f"{os.path.dirname(os.path.realpath(__file__))}/input.txt"
    # input_path = f"{os.path.dirname(os.path.realpath(__file__))}/input_test.txt"

    inputs = get_inputs(input_path)

    profile_run("Part 1", lambda: part1(inputs))
    profile_run("Part 2", lambda: part2(inputs))
