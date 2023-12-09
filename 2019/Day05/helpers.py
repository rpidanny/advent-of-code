import sys

sys.path.append("utils")

from intcode import parse_instruction


def run_program(
    mem: list[int], io_ip: list[int] = [], io_op: list[int] = []
) -> list[int]:
    ip = 0

    def get_val(addr: int, mode: int) -> int:
        return mem[addr] if mode else mem[mem[addr]]

    num_params = {1: 3, 2: 3, 3: 1, 4: 1, 5: 2, 6: 2, 7: 3, 8: 3, 99: 0}

    while True:
        _, m_2, m_1, op_code = parse_instruction(mem[ip])

        jump = False

        if op_code == 1:
            mem[mem[ip + 3]] = get_val(ip + 1, m_1) + get_val(ip + 2, m_2)
        elif op_code == 2:
            mem[mem[ip + 3]] = get_val(ip + 1, m_1) * get_val(ip + 2, m_2)
        elif op_code == 3:
            mem[mem[ip + 1]] = io_ip.pop(0)
        elif op_code == 4:
            io_op.append(get_val(ip + 1, m_1))
        elif op_code == 5:
            if jump := get_val(ip + 1, m_1) > 0:
                ip = get_val(ip + 2, m_2)
        elif op_code == 6:
            if jump := get_val(ip + 1, m_1) == 0:
                ip = get_val(ip + 2, m_2)
        elif op_code == 7:
            mem[mem[ip + 3]] = 1 if get_val(ip + 1, m_1) < get_val(ip + 2, m_2) else 0
        elif op_code == 8:
            mem[mem[ip + 3]] = 1 if get_val(ip + 1, m_1) == get_val(ip + 2, m_2) else 0
        elif op_code == 99:
            break
        else:
            raise Exception(f"Unknown opcode: {op_code}")

        if not jump:
            ip += num_params[op_code] + 1

    return mem
