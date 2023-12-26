import sys
import time


def print_grid(grid, mapper=lambda v: str(v), delay=0):
    for i, row in enumerate(grid):
        sys.stdout.write("\033[K")  # Clear the current line
        sys.stdout.write(
            "\033[{};{}H".format(i + 1, 0)
        )  # Move the cursor to the beginning of the line
        sys.stdout.write("".join(map(mapper, row)) + "\n")
        sys.stdout.flush()

    if delay:
        time.sleep(delay)
