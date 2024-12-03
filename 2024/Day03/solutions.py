import re


def evaluate_instruction(instruction: str) -> int:
    return eval(re.sub(r"[^\d,]", "", instruction).replace(",", "*"))


def part1(inputs: list[str]) -> int:
    return sum(
        evaluate_instruction(inst)
        for line in inputs
        for inst in re.findall(r"mul\(\d{1,3},\d{1,3}\)", line)
    )


def part2(inputs: list[str]) -> int:
    result, enabled = 0, True
    for line in inputs:
        for inst in re.findall(r"mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)", line):
            if inst == "do()":
                enabled = True
            elif inst == "don't()":
                enabled = False
            elif enabled:
                result += evaluate_instruction(inst)
    return result
