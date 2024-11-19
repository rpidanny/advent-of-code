import os
import sys
import time

from utils.grid import get_min_max_xy


def print_grid(grid, mapper=lambda v: str(v), delay=0, padding=False):
    # os.system("cls" if os.name == "nt" else "clear")
    for i, row in enumerate(grid):
        sys.stdout.write("\033[K")  # Clear the current line
        sys.stdout.write(
            "\033[{};{}H".format(i + 1, 0)
        )  # Move the cursor to the beginning of the line
        sys.stdout.write((" " if padding else "").join(map(mapper, row)) + "\n")
        sys.stdout.flush()
        # print("".join(map(mapper, row)))

    if delay:
        time.sleep(delay)


def print_grid_dict(grid, mapper=lambda v: str(v), delay=0):
    os.system("cls" if os.name == "nt" else "clear")
    min_x, max_x, min_y, max_y = get_min_max_xy(grid)

    for y in range(min_y, max_y + 1):
        print("".join(mapper((x, y)) for x in range(min_x, max_x + 1)))

    if delay:
        time.sleep(delay)
