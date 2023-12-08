import sys
import os

sys.path.append("./")

from solutions import part1, part2
from utils.inputs import get_inputs

if __name__ == "__main__":
    input_path = f"{os.path.dirname(os.path.realpath(__file__))}/input.txt"
    inputs = get_inputs(input_path)

    print(f"Part 1: {part1(inputs)}")
    print(f"Part 2: {part2(inputs)}")
