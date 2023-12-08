def get_program(inputs: list[str]) -> list[int]:
    return list(map(lambda x: int(x), inputs[0].split(",")))


def run_program(mem: list[int]) -> list[int]:
    ip = 0
    op_code = mem[ip]

    while op_code != 99:
        param_1 = mem[ip + 1]
        param_2 = mem[ip + 2]
        param_3 = mem[ip + 3]

        if op_code == 1:
            mem[param_3] = mem[param_1] + mem[param_2]
        elif op_code == 2:
            mem[param_3] = mem[param_1] * mem[param_2]
        else:
            raise Exception("Unknown opcode")
        ip += 4
        op_code = mem[ip]

    return mem
