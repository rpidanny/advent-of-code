from copy import deepcopy
from itertools import combinations
from math import lcm


class Jupiter:
    def __init__(self, moons: list[list[int]]):
        self.__moons = moons
        self.__initial_state = deepcopy(moons)
        self.__velocities = [[0] * 3 for _ in range(len(moons))]
        self.__m_combinations = list(combinations(range(len(moons)), 2))

    def __update_velocity(self):
        for m1, m2 in self.__m_combinations:
            for k in range(3):
                diff = self.__moons[m1][k] - self.__moons[m2][k]
                if diff == 0:
                    continue
                self.__velocities[m1][k] -= diff // abs(diff)
                self.__velocities[m2][k] += diff // abs(diff)

    def __update_position(self):
        for i in range(len(self.__moons)):
            self.__moons[i] = [
                m + v for m, v in zip(self.__moons[i], self.__velocities[i])
            ]

    def __get_energy(self, values):
        return [sum(map(abs, v)) for v in values]

    def get_total_energy(self, steps):
        for _ in range(steps):
            self.__update_velocity()
            self.__update_position()

        pe = self.__get_energy(self.__moons)
        ke = self.__get_energy(self.__velocities)

        return sum(p * k for p, k in zip(pe, ke))

    def get_universe_repeat_time(self):
        axis_cycles = [0, 0, 0]

        steps = 0
        while not all(axis_cycles):
            steps += 1

            self.__update_velocity()
            self.__update_position()

            for k in range(3):
                if not axis_cycles[k] and all(
                    self.__moons[i][k] == self.__initial_state[i][k]
                    and self.__velocities[i][k] == 0
                    for i in range(len(self.__moons))
                ):
                    axis_cycles[k] = steps

        return lcm(*axis_cycles)
