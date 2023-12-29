from enum import Enum

from termcolor import colored


class Cell(Enum):
    WALL = 0
    EMPTY = 1
    OXYGEN = 2

    def __repr__(self) -> str:
        return self.name


oxygen_char = colored("O", "cyan", attrs=["bold"])
visited_char = colored("*", "magenta", attrs=["bold"])
wall_char = "█"
empty_char = colored(" ", "white")
hidden_char = colored("?", "grey")
