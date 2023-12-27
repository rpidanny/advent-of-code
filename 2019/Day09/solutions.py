import io
import sys

sys.path.append("utils")

from intcode import IntCode, get_program


def part1(inputs: list[str]) -> int:
    prog = get_program(inputs)

    io_ip = [1]
    int_code = IntCode(prog, lambda: io_ip.pop(0))
    outputs = int_code.run_until_halt()

    return outputs[-1]


def part2(inputs: list[str]) -> int:
    prog = get_program(inputs)

    io_ip = [2]
    int_code = IntCode(prog, lambda: io_ip.pop(0))
    outputs = int_code.run_until_halt()

    return outputs[-1]
