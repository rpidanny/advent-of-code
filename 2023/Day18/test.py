def shoelace_formula(points):
    n = len(points)
    area = 0

    for i in range(n - 1):
        area += (points[i][0] * points[i + 1][1]) - (points[i + 1][0] * points[i][1])

    # Add the last edge
    area += (points[n - 1][0] * points[0][1]) - (points[0][0] * points[n - 1][1])

    # Take the absolute value and divide by 2
    area = abs(area) / 2

    return area


# Define the set of points representing the polygon
polygon_points = [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [5, 0],
    [6, 0],
    [6, 1],
    [6, 2],
    [6, 3],
    [6, 4],
    [6, 5],
    [5, 5],
    [4, 5],
    [4, 6],
    [4, 7],
    [5, 7],
    [6, 7],
    [6, 8],
    [6, 9],
    [5, 9],
    [4, 9],
    [3, 9],
    [2, 9],
    [1, 9],
    [1, 8],
    [1, 7],
    [0, 7],
    [0, 6],
    [0, 5],
    [1, 5],
    [2, 5],
    [2, 4],
    [2, 3],
    [2, 2],
    [1, 2],
    [0, 2],
    [0, 1],
    [0, 0],
]

# Calculate the area of the polygon
polygon_area = shoelace_formula(polygon_points)

print("Polygon Area:", polygon_area)
