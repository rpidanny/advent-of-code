from enum import Enum


class Direction(Enum):
    NORTH = 1
    SOUTH = 2
    WEST = 3
    EAST = 4

    def __repr__(self) -> str:
        return self.name

    def move(self, pos: tuple) -> tuple:
        x, y = pos
        return {
            Direction.NORTH: (x, y - 1),
            Direction.SOUTH: (x, y + 1),
            Direction.WEST: (x - 1, y),
            Direction.EAST: (x + 1, y),
        }[self]

    def right(self):
        return {
            Direction.NORTH: Direction.EAST,
            Direction.EAST: Direction.SOUTH,
            Direction.SOUTH: Direction.WEST,
            Direction.WEST: Direction.NORTH,
        }[self]

    def left(self):
        return {
            Direction.NORTH: Direction.WEST,
            Direction.WEST: Direction.SOUTH,
            Direction.SOUTH: Direction.EAST,
            Direction.EAST: Direction.NORTH,
        }[self]

    def reverse(self):
        return {
            Direction.NORTH: Direction.SOUTH,
            Direction.SOUTH: Direction.NORTH,
            Direction.WEST: Direction.EAST,
            Direction.EAST: Direction.WEST,
        }[self]
