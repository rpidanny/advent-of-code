from copy import deepcopy
import sys

sys.path.append("utils")

from intcode import get_program, run_program


def amplify(inputs: list[str], phases: list[int], input: int) -> int:
    program = get_program(inputs)

    output = input
    for amp in range(len(phases)):
        mem = deepcopy(program)
        io_ip = [phases[amp], output]
        io_op = []
        run_program(mem, io_ip, io_op)
        output = io_op[0]
    return output
