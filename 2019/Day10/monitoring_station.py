import math
from collections import defaultdict


class MonitoringStation:
    def __init__(self, input):
        self.__grid = input
        self.__asteroids = self.__get_asteroids()

    def __get_distance_between_asteroids(self, a1: [int, int], a2: [int, int]) -> int:
        x1, y1 = a1
        x2, y2 = a2
        return math.hypot(x2 - x1, y2 - y1)

    def __get_asteroids(self) -> list[int, int]:
        return [
            [col, row]
            for row, row_data in enumerate(self.__grid)
            for col, value in enumerate(row_data)
            if value == "#"
        ]

    def __get_angle_between_asteroids(self, a1: [int, int], a2: [int, int]) -> int:
        x1, y1 = a1
        x2, y2 = a2

        angle = (
            math.degrees(math.atan2(y2 - y1, x2 - x1)) + 90
        )  # Adjust for the fact that 0 degrees is up

        # Ensure the angle is not negative
        return angle + 360 if angle < 0 else angle

    def get_max_viewable_asteroids(self) -> [[int, int], dict]:
        best_asteroid = None
        asteroid_angles = defaultdict(list)

        for asteroid in self.__asteroids:
            degrees = defaultdict(list)
            for other_asteroid in self.__asteroids:
                if asteroid == other_asteroid:
                    continue
                a = self.__get_angle_between_asteroids(asteroid, other_asteroid)
                degrees[a].append(other_asteroid)
            if (len(degrees)) > len(asteroid_angles):
                best_asteroid = asteroid
                asteroid_angles = degrees

        return [best_asteroid, asteroid_angles]

    def get_nth_vaporized_asteroid(self, n: int) -> [int, int]:
        asteroid, asteroid_angles = self.get_max_viewable_asteroids()

        # Sort the view points by angle so we can iterate through them in order of angle
        sorted_asteroid_angles = sorted(asteroid_angles.items(), key=lambda x: x[0])

        # Sort the asteroids at each angle by distance from the station
        map(
            lambda x: x[1].sort(
                key=lambda y: self.__get_distance_between_asteroids(y, asteroid),
                reverse=True,  # desc so we can pop from the end
            ),
            sorted_asteroid_angles,
        )

        vaporized_asteroids = []

        while len(vaporized_asteroids) < n:
            for asteroid in sorted_asteroid_angles:
                if len(asteroid[1]) > 0:
                    vaporized_asteroids.append(asteroid[1].pop())
                if len(vaporized_asteroids) == n:
                    break

        return vaporized_asteroids[n - 1]
