from itertools import combinations

from direction import Direction
from intcode import IntCode, get_program
from output import print_grid
from termcolor import colored


class Robot:
    def __init__(self, input: str, visualize: bool = False):
        self.__prog = input
        self.__inputs = []
        self.__visualize = visualize

    def __get_input(self) -> int:
        return self.__inputs.pop(0)

    def __render_char(self, char: str) -> str:
        if char == "#":
            return "#"
        if char == ".":
            return " "
        return colored(char, "red", attrs=["bold"])

    def __is_intersection(self, pos, frame: list[tuple[int, int]]) -> bool:
        x, y = pos

        if not (0 < y < len(frame) - 1 and 0 < x < len(frame[y]) - 1):
            return False

        return all(
            frame[y + dy][x + dx] == "#"
            for dx, dy in [(0, 0), (-1, 0), (1, 0), (0, -1), (0, 1)]
        )

    def __print_frame(self, frame: list[tuple[int, int]]):
        if self.__visualize:
            print_grid(frame, self.__render_char, delay=0.0001)

    def __get_frame(self):
        mem = get_program(self.__prog)
        intcode = IntCode(mem, self.__get_input)
        frame = []
        line = []
        while True:
            res = intcode.run()

            if res.output == 10 and len(line) > 0:
                frame.append(line)
                line = []
            else:
                line.append(chr(res.output))

            if res.halted:
                break
        return frame

    def __get_start_pos(
        self, frame: list[tuple[int, int]]
    ) -> tuple[tuple[int, int], Direction]:
        for y, row in enumerate(frame):
            for x, cell in enumerate(row):
                if cell in ["^", "v", "<", ">"]:
                    return ((x, y), Direction(cell))
        return None

    def __group_paths(self, path: list[tuple[int, int]]) -> dict[tuple, str]:
        # Find all substrings of path
        substrings = [
            tuple(path[i:j]) for i, j in combinations(range(len(path) + 1), 2)
        ]

        # Remove substrings that are too short, too long or duplicates
        patterns = {}
        for item in substrings:
            if 3 <= len(item) <= 10 and item not in patterns:
                patterns[item] = 1

        # Find the combination of 3 patterns that covers the whole path
        for pattern_combination in combinations(patterns, 3):
            string = "".join(path)
            for pattern in pattern_combination:
                string = string.replace("".join(pattern), "")

            if not string:
                return {
                    pattern: chr(ord("A") + idx)
                    for idx, pattern in enumerate(pattern_combination)
                }

    def __compress_path(
        self, path: list[tuple[int, int]], groups: tuple[tuple]
    ) -> list[tuple[int, int]]:
        compressed_path = [
            groups[tuple(path[i:j])]
            for i, j in combinations(range(len(path) + 1), 2)
            if tuple(path[i:j]) in groups
        ]
        return compressed_path

    # Returns a list of actions to take to get to the end
    # L4,L4,L6,R10,L6,L4,L4,L6,R10,L6,L12,L6,R10,L6,R8,R10,L6,R8,R10,L6,L4,L4,L6,R10,L6,R8,R10,L6,L12,L6,R10,L6,R8,R10,L6,L12,L6,R10,L6
    # Direction and number of steps to take are joined together to reduce the number of combinations to find the shortest combination later on
    def __get_path(self, frame: list[tuple[int, int]]) -> list[tuple[int, int]]:
        path = []
        pos, dir = self.__get_start_pos(frame)

        stack = [(pos, dir)]

        cur_step_count = 0
        while len(stack):
            p, d = stack.pop()

            # First check if we can go straight
            # If we can't, check if we can turn left or right
            # If we can't, we have reached the end
            # This should move the robot along the entire path
            for idx, nd in enumerate([d, d.left(), d.right()]):
                nx, ny = nd.move(p)
                if (
                    0 <= ny < len(frame)
                    and 0 <= nx < len(frame[ny])
                    and frame[ny][nx] == "#"
                ):
                    if nd != d:
                        if path:
                            path[-1] += str(cur_step_count)
                            cur_step_count = 0
                        path.append("L" if idx == 1 else "R")
                        stack.append((p, nd))
                    else:
                        cur_step_count += 1
                        stack.append((nd.move(p), nd))
                    break

        if cur_step_count:
            path[-1] += str(cur_step_count)

        return path

    def __update_robot_input(self, frame: list[tuple[int, int]]) -> int:
        path = self.__get_path(frame)
        groups = self.__group_paths(path)
        compressed_path = self.__compress_path(path, groups)

        movements = "\n".join(
            [
                ",".join(f"{item[:1]},{item[1:]}" for item in movement)
                for movement in groups.keys()
            ]
        )

        self.__inputs = list(
            map(
                ord,
                list(
                    f"{','.join(compressed_path)}\n"
                    + f"{movements}\n"
                    + f"{ 'y' if self.__visualize else 'n'}\n"
                ),
            )
        )

    def get_alignment_param(self) -> int:
        frame = self.__get_frame()

        return sum(
            x * y
            for y, row in enumerate(frame)
            for x, cell in enumerate(row)
            if cell == "#" and self.__is_intersection((x, y), frame)
        )

    def visit_scaffold(self):
        prog = get_program(self.__prog)
        prog[0] = 2
        intcode = IntCode(prog, self.__get_input)
        frame = []
        line = []
        first_frame = True

        while True:
            res = intcode.run()

            if res.halted:
                break

            if res.output == 10:
                # Skip empty lines and the input prompts
                if len(line) > 0 and "".join(line) not in [
                    "Continuous video feed?",
                    "Function C:",
                    "Function B:",
                    "Function A:",
                    "Main:",
                ]:
                    frame.append(line)

                line = []
            elif (
                res.output > 255
            ):  # The output greater than 255 (8bit ASCII) is the final answer
                return res.output
            else:
                line.append(chr(res.output))

            # The frame is 35 lines long
            if len(frame) == 35:
                # The first frame is the map of the scaffolding
                # We need to find the path to the end and compress it into a list of actions
                # and then update the robot input with the compressed path
                if first_frame:
                    first_frame = False
                    self.__update_robot_input(frame)

                self.__print_frame(frame)
                frame = []
                line = []
