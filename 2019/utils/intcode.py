from enum import Enum
from typing import Tuple


class OpCode(Enum):
    ADD = 1
    MUL = 2
    INPUT = 3
    OUTPUT = 4
    JUMP_IF_TRUE = 5
    JUMP_IF_FALSE = 6
    LESS_THAN = 7
    EQUALS = 8
    HALT = 99

    def num_params(self):
        return {
            OpCode.ADD: 3,
            OpCode.MUL: 3,
            OpCode.INPUT: 1,
            OpCode.OUTPUT: 1,
            OpCode.JUMP_IF_TRUE: 2,
            OpCode.JUMP_IF_FALSE: 2,
            OpCode.LESS_THAN: 3,
            OpCode.EQUALS: 3,
            OpCode.HALT: 0,
        }[self]


def get_program(inputs: list[str]) -> list[int]:
    return list(map(int, inputs[0].split(",")))


class ProgramState:
    def __init__(self, ip: int, mem: list[int], output: int, halted: bool) -> None:
        self.ip = ip
        self.mem = mem
        self.output = output
        self.halted = halted


class IntCode:
    def __init__(self, mem: list[int], ip: int, inputs: list[int] = []) -> None:
        self.mem = mem
        self.ip = ip
        self.inputs = inputs

    def run(
        self,
    ) -> ProgramState:
        while True:
            op_code, m_1, m_2, _ = self.__get_next_instruction()

            if op_code == OpCode.ADD:
                self.__add(m_1, m_2)
            elif op_code == OpCode.MUL:
                self.__mul(m_1, m_2)
            elif op_code == OpCode.INPUT:
                self.__input()
            elif op_code == OpCode.OUTPUT:
                return self.__output(op_code, m_1)
            elif op_code == OpCode.JUMP_IF_TRUE:
                if self.__jump_if_true(m_1, m_2):
                    continue
            elif op_code == OpCode.JUMP_IF_FALSE:
                if self.__jump_if_false(m_1, m_2):
                    continue
            elif op_code == OpCode.LESS_THAN:
                self.__less_than(m_1, m_2)
            elif op_code == OpCode.EQUALS:
                self.__equals(m_1, m_2)
            elif op_code == OpCode.HALT:
                return self.__halt()
            else:
                raise Exception(f"Unknown opcode: {op_code}")

            self.ip += op_code.num_params() + 1

    def __get_next_instruction(self) -> Tuple[OpCode, int, int, int]:
        instr = str(self.mem[self.ip]).zfill(5)
        op_code = OpCode(int(instr[-2:]))
        m_3, m_2, m_1 = map(int, instr[:3])
        return op_code, m_1, m_2, m_3

    def __get_val(self, addr: int, mode: int) -> int:
        return self.mem[addr] if mode else self.mem[self.mem[addr]]

    def __add(self, m_1: int, m_2: int) -> None:
        self.mem[self.mem[self.ip + 3]] = self.__get_val(
            self.ip + 1, m_1
        ) + self.__get_val(self.ip + 2, m_2)

    def __mul(self, m_1: int, m_2: int) -> None:
        self.mem[self.mem[self.ip + 3]] = self.__get_val(
            self.ip + 1, m_1
        ) * self.__get_val(self.ip + 2, m_2)

    def __input(self) -> None:
        self.mem[self.mem[self.ip + 1]] = self.inputs.pop(0)

    def __output(self, op_code: OpCode, m_1: int) -> int:
        io_op = self.__get_val(self.ip + 1, m_1)
        return ProgramState(self.ip + op_code.num_params() + 1, self.mem, io_op, False)

    def __jump_if_true(self, m_1: int, m_2: int) -> bool:
        if self.__get_val(self.ip + 1, m_1) > 0:
            self.ip = self.__get_val(self.ip + 2, m_2)
            return True
        return False

    def __jump_if_false(self, m_1: int, m_2: int) -> bool:
        if self.__get_val(self.ip + 1, m_1) == 0:
            self.ip = self.__get_val(self.ip + 2, m_2)
            return True
        return False

    def __less_than(self, m_1: int, m_2: int) -> None:
        self.mem[self.mem[self.ip + 3]] = (
            1
            if self.__get_val(self.ip + 1, m_1) < self.__get_val(self.ip + 2, m_2)
            else 0
        )

    def __equals(self, m_1: int, m_2: int) -> None:
        self.mem[self.mem[self.ip + 3]] = (
            1
            if self.__get_val(self.ip + 1, m_1) == self.__get_val(self.ip + 2, m_2)
            else 0
        )

    def __halt(self) -> None:
        return ProgramState(self.ip, self.mem, 0, True)
