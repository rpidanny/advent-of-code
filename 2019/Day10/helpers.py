import math


class MonitoringStation:
    def __init__(self, input):
        self.__grid = input
        self.__astroid_locations = self.__get_astroid_locations()

    def __get_distance_between_astroids(
        self, astroid1: [int, int], astroid2: [int, int]
    ) -> int:
        x1, y1 = astroid1
        x2, y2 = astroid2
        return math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)

    def __get_astroid_locations(self) -> list[int, int]:
        astroid_locations = []
        for row in range(len(self.__grid)):
            for col in range(len(self.__grid[row])):
                if self.__grid[row][col] == "#":
                    astroid_locations.append([col, row])
        return astroid_locations

    def __get_angle_between_astroids(
        self, astroid1: [int, int], astroid2: [int, int]
    ) -> int:
        x1, y1 = astroid1
        x2, y2 = astroid2

        angle = math.atan2(y2 - y1, x2 - x1)
        angle_degrees = math.degrees(angle)
        return angle_degrees

    def get_max_viewable_astroids(self) -> [int, int, int, dict]:
        max_viewable_astroids = 0
        best_astroid = None
        view_points = {}

        for astroid in self.__astroid_locations:
            degrees = {}
            for other_astroid in self.__astroid_locations:
                if astroid == other_astroid:
                    continue
                a = self.__get_angle_between_astroids(astroid, other_astroid) + 90
                if a in degrees:
                    degrees[a].append(other_astroid)
                else:
                    degrees[a] = [other_astroid]
            if (len(degrees)) > max_viewable_astroids:
                max_viewable_astroids = len(degrees)
                best_astroid = astroid
                view_points = degrees
        return [best_astroid[1], best_astroid[0], max_viewable_astroids, view_points]

    def get_200th_astroid(self) -> [int, int]:
        _, _, astroid, view_points = self.get_max_viewable_astroids()

        sorted_view_points = sorted(
            view_points.items(), key=lambda x: x[0], reverse=True
        )
        print(sorted_view_points)

        for i in range(200):
            for view_point in sorted_view_points:
                if len(view_point[1]) > 0:
                    astroid = view_point[1].pop(0)
                    print(astroid)
                else:
                    sorted_view_points.remove(view_point)
                    break
