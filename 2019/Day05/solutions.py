import sys

sys.path.append("utils")

from helpers import run_program
from intcode import get_program


def part1(inputs: list[str]) -> int:
    mem = get_program(inputs)

    io_ip = [1]
    io_op = []

    run_program(mem, io_ip, io_op)

    return io_op.pop()


def part2(inputs: list[str]) -> int:
    mem = get_program(inputs)

    io_ip = [5]
    io_op = []

    run_program(mem, io_ip, io_op)

    return io_op.pop()
