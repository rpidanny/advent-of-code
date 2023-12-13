from image_processor import ImageProcessor


def part1(inputs: list[str]) -> int:
    ip = ImageProcessor(25, 6, inputs[0])
    return ip.get_1_by_2_count()


def part2(inputs: list[str], width=25, height=6, print=True) -> None:
    ip = ImageProcessor(width, height, inputs[0])
    ip.print()
