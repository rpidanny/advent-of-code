from enum import Enum
from typing import Dict, Tuple


class OpCode(Enum):
    ADD = 1
    MUL = 2
    INPUT = 3
    OUTPUT = 4
    JUMP_IF_TRUE = 5
    JUMP_IF_FALSE = 6
    LESS_THAN = 7
    EQUALS = 8
    RELATIVE_BASE = 9
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
            OpCode.RELATIVE_BASE: 1,
            OpCode.HALT: 0,
        }[self]


def get_program(inputs: list[str]) -> Dict[int, int]:
    arr = list(map(int, inputs[0].split(",")))
    return {index: value for index, value in enumerate(arr)}


class ProgramState:
    def __init__(
        self, ip: int, mem: Dict[int, int], output: int, halted: bool, rb: int
    ) -> None:
        self.ip = ip
        self.mem = mem
        self.output = output
        self.halted = halted
        self.rb = rb


class IntCode:
    def __init__(
        self, mem: Dict[int, int], ip: int = 0, inputs: list[int] = [], rb: int = 0
    ) -> None:
        self.__ip = ip
        self.__inputs = inputs
        self.__rb = rb  # relative base
        self.__mem = mem

    def run(
        self,
    ) -> ProgramState:
        while True:
            op_code, m_1, m_2, m_3 = self.__get_next_instruction()

            if op_code == OpCode.ADD:
                self.__add(m_1, m_2, m_3)
            elif op_code == OpCode.MUL:
                self.__mul(m_1, m_2, m_3)
            elif op_code == OpCode.INPUT:
                self.__input(m_1)
            elif op_code == OpCode.OUTPUT:
                return self.__output(op_code, m_1)
            elif op_code == OpCode.JUMP_IF_TRUE:
                if self.__jump_if_true(m_1, m_2):
                    continue
            elif op_code == OpCode.JUMP_IF_FALSE:
                if self.__jump_if_false(m_1, m_2):
                    continue
            elif op_code == OpCode.LESS_THAN:
                self.__less_than(m_1, m_2, m_3)
            elif op_code == OpCode.EQUALS:
                self.__equals(m_1, m_2, m_3)
            elif op_code == OpCode.RELATIVE_BASE:
                self.__set_relative_base(m_1)
            elif op_code == OpCode.HALT:
                return self.__halt()
            else:
                raise Exception(f"Unknown opcode: {op_code}")

            self.__ip += op_code.num_params() + 1

    def run_until_halt(self) -> list[int]:
        output = []
        while True:
            state = self.run()
            if state.halted:
                return output
            output.append(state.output)

    def __get_next_instruction(self) -> Tuple[OpCode, int, int, int]:
        instr = str(self.__mem[self.__ip]).zfill(5)
        op_code = OpCode(int(instr[-2:]))
        m_3, m_2, m_1 = map(int, instr[:3])
        return op_code, m_1, m_2, m_3

    def __get_val(self, addr: int, mode: int) -> int:
        if mode == 0:  # position mode
            return self.__mem.get(self.__mem.get(addr, 0), 0)
        elif mode == 1:  # immediate mode
            return self.__mem.get(addr, 0)
        elif mode == 2:  # relative mode
            return self.__mem.get(self.__mem.get(addr, 0) + self.__rb, 0)

    def __set_val(self, addr: int, val: int, mode: int) -> None:
        if mode == 0:
            self.__mem[self.__mem.get(addr, 0)] = val
        elif mode == 1:
            self.__mem[addr] = val
        elif mode == 2:
            self.__mem[self.__mem.get(addr, 0) + self.__rb] = val

    def __add(self, m_1: int, m_2: int, m_3: int) -> None:
        sum = self.__get_val(self.__ip + 1, m_1) + self.__get_val(self.__ip + 2, m_2)
        self.__set_val(self.__ip + 3, sum, m_3)

    def __mul(self, m_1: int, m_2: int, m_3: int) -> None:
        prod = self.__get_val(self.__ip + 1, m_1) * self.__get_val(self.__ip + 2, m_2)
        self.__set_val(self.__ip + 3, prod, m_3)

    def __input(self, m_1: int) -> None:
        self.__set_val(self.__ip + 1, self.__inputs.pop(0), m_1)

    def __output(self, op_code: OpCode, m_1: int) -> int:
        io_op = self.__get_val(self.__ip + 1, m_1)
        self.__ip += op_code.num_params() + 1

        return ProgramState(
            self.__ip,
            self.__mem,
            io_op,
            False,
            self.__rb,
        )

    def __jump_if_true(self, m_1: int, m_2: int) -> bool:
        if self.__get_val(self.__ip + 1, m_1) > 0:
            self.__ip = self.__get_val(self.__ip + 2, m_2)
            return True
        return False

    def __jump_if_false(self, m_1: int, m_2: int) -> bool:
        if self.__get_val(self.__ip + 1, m_1) == 0:
            self.__ip = self.__get_val(self.__ip + 2, m_2)
            return True
        return False

    def __less_than(self, m_1: int, m_2: int, m_3: int) -> None:
        val = (
            1
            if self.__get_val(self.__ip + 1, m_1) < self.__get_val(self.__ip + 2, m_2)
            else 0
        )
        self.__set_val(self.__ip + 3, val, m_3)

    def __equals(self, m_1: int, m_2: int, m_3: int) -> None:
        val = (
            1
            if self.__get_val(self.__ip + 1, m_1) == self.__get_val(self.__ip + 2, m_2)
            else 0
        )
        self.__set_val(self.__ip + 3, val, m_3)

    def __set_relative_base(self, m_1: int) -> None:
        self.__rb += self.__get_val(self.__ip + 1, m_1)

    def __halt(self) -> None:
        return ProgramState(self.__ip, self.__mem, 0, True, self.__rb)
