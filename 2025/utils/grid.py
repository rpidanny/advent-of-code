def get_min_max_xy(grid):
    min_x = min(grid, key=lambda k: k[0])[0]
    max_x = max(grid, key=lambda k: k[0])[0]
    min_y = min(grid, key=lambda k: k[1])[1]
    max_y = max(grid, key=lambda k: k[1])[1]
    return min_x, max_x, min_y, max_y
