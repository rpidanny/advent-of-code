from collections import defaultdict

from sympy import *


class Chemical:
    def __init__(self, quantity: str, name: str):
        self.name = name
        self.quantity = int(quantity)

    def __repr__(self):
        return f"{self.quantity} {self.name}"

    def __str__(self):
        return self.__repr__()


class ChemicalReactions:
    def __init__(self, ip: list[Chemical], op: Chemical):
        self.ip = ip
        self.op = op

    def __repr__(self):
        return f"Input: {self.ip} --> Output: {self.op}"

    def __str__(self):
        return self.__repr__()


class Reactor:
    def __init__(self, inputs: list[str]):
        self.reactions = self.parse_input(inputs)
        self.chemicals = defaultdict(int)
        self.output_map = {x.op.name: x for x in self.reactions}

    def parse_input(self, inputs: list[str]):
        reactions = []
        for line in inputs:
            ip, op = line.split(" => ")
            ip = ip.split(", ")
            ip = [Chemical(*x.split(" ")) for x in ip]
            op = Chemical(*op.split(" "))
            reactions.append(ChemicalReactions(ip, op))
        return reactions

    def get_ore(self, chemical: str, quantity: int):
        if chemical == "ORE":
            self.chemicals["ORE"] += quantity
            return quantity
        if self.chemicals[chemical] >= quantity:
            self.chemicals[chemical] -= quantity
            return 0
        else:
            quantity -= self.chemicals[chemical]
            self.chemicals[chemical] = 0
            reaction = self.output_map[chemical]
            multiplier = quantity // reaction.op.quantity
            if quantity % reaction.op.quantity != 0:
                multiplier += 1
            ore = 0
            for ip in reaction.ip:
                ore += self.get_ore(ip.name, ip.quantity * multiplier)
            self.chemicals[chemical] += reaction.op.quantity * multiplier - quantity
            return ore

    def get_fuel_from_ore(self, quantity: int):
        return 1
