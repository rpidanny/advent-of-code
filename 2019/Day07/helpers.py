import sys
from copy import deepcopy

sys.path.append("utils")

from intcode import IntCode


def amplify(prog: list[int], phases: list[int], input: int) -> int:
    output = input
    for amp in range(len(phases)):
        mem = deepcopy(prog)
        io_ip = [phases[amp], output]
        state = IntCode(mem, 0, io_ip).run()
        output = state.output
    return output


def amplify_with_feedback(prog: list[int], phases: list[int], input: int) -> int:
    mem_arr = [deepcopy(prog) for _ in range(len(phases))]
    inputs_arr = [[phase] for phase in phases]
    ip_arr = [0] * len(phases)

    while True:
        halt = False
        for idx, (inputs, mem, ip) in enumerate(zip(inputs_arr, mem_arr, ip_arr)):
            inputs.append(input)

            state = IntCode(mem, ip, inputs).run()
            ip_arr[idx] = state.ip

            if state.halted:
                halt = True
                continue

            input = state.output

        if halt:
            break

    return input
