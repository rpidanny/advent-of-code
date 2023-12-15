import sys

sys.path.append("utils")

from intcode import IntCode, get_program


def part1(inputs: list[str]) -> int:
    prog = get_program(inputs)

    int_code = IntCode(prog, 0, [1])
    outputs = int_code.run_until_halt()

    return outputs[-1]


def part2(inputs: list[str]) -> int:
    prog = get_program(inputs)

    int_code = IntCode(prog, 0, [2])
    outputs = int_code.run_until_halt()

    return outputs[-1]
