import copy

from helpers import get_program, run_program


def part1(inputs: list[str]) -> int:
    mem = get_program(inputs)
    mem[1] = 12
    mem[2] = 2

    run_program(mem)

    return mem[0]


def part2(inputs: list[str]) -> int:
    program = get_program(inputs)

    for noun in range(0, 99):
        for verb in range(0, 99):
            mem = copy.deepcopy(program)

            mem[1] = noun
            mem[2] = verb

            run_program(mem)

            if mem[0] == 19690720:
                return (100 * noun) + verb
