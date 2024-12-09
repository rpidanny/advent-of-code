def get_colored_char(num):
    """
    Returns a unique color-colored char for a given number.
    """
    rgb = number_to_color(num)
    ansi_code = rgb_to_ansi256(*rgb)
    return f"\033[38;5;{ansi_code}m█\033[0m"


def rgb_to_ansi256(r, g, b):
    """
    Converts an RGB color to the nearest ANSI 256-color code.
    """
    scale = lambda value: int((value / 255) * 5)  # Normalize RGB values to 0-5 range
    r_scaled, g_scaled, b_scaled = map(scale, (r, g, b))
    return 16 + (36 * r_scaled) + (6 * g_scaled) + b_scaled


def number_to_color(num, max_num=570):
    """
    Maps a number to a unique RGB color in the HSV color space.
    """
    if not (0 <= num <= max_num):
        raise ValueError(
            f"Input number must be between 0 and {max_num} inclusive: {num}"
        )

    hue = 1 - num / max_num  # Map number to hue in range [0, 1]

    def hsv_to_rgb(h, s=0.8, v=0.9):
        h *= 6  # Scale hue to [0, 6)
        i, f = divmod(h, 1)
        v, p, q, t = [
            int(v * 255),
            int(v * (1 - s) * 255),
            int(v * (1 - s * f) * 255),
            int(v * (1 - s * (1 - f)) * 255),
        ]
        return [(v, t, p), (q, v, p), (p, v, t), (p, q, v), (t, p, v), (v, p, q)][
            int(i) % 6
        ]

    return hsv_to_rgb(hue)
