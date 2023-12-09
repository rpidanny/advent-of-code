from typing import Tuple


def get_program(inputs: list[str]) -> list[int]:
    return list(map(lambda x: int(x), inputs[0].split(",")))


def parse_instruction(instr: int) -> Tuple[int, int, int, int]:
    instr = str(instr).zfill(5)
    op_code = int(instr[-2:])
    m_3, m_2, m_1 = map(int, instr[:3])
    return m_3, m_2, m_1, op_code
