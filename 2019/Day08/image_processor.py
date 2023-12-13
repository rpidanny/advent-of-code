import math


class ImageProcessor:
    def __init__(self, width: int, height: int, raw_image: str):
        self.__raw_image = raw_image
        self.__width = width
        self.__height = height

    def get_1_by_2_count(self) -> int:
        layer = self.__get_layer_with_fewest_0()
        count_1 = 0
        count_2 = 0
        for row in layer:
            count_1 += row.count("1")
            count_2 += row.count("2")

        return count_1 * count_2

    def render(self):
        raw_img = self.__decode()
        img = [[0 for _ in range(self.__width)] for _ in range(self.__height)]

        for r in range(self.__height):
            for c in range(self.__width):
                for l in range(len(raw_img)):
                    if raw_img[l][r][c] == "2":
                        continue
                    img[r][c] = raw_img[l][r][c]
                    break
        return img

    def print(self):
        img = self.render()
        for r in img:
            print("".join(r).replace("0", " ").replace("1", "*"))

    def __decode(self) -> list[list[list[str]]]:
        image = []

        for layer_idx in range(0, len(self.__raw_image), self.__width * self.__height):
            layer = []
            for r in range(self.__height):
                row = []
                for c in range(self.__width):
                    row.append(self.__raw_image[layer_idx + r * self.__width + c])

                layer.append(row)
            image.append(layer)

        return image

    def __get_layer_with_fewest_0(self) -> list[list[str]]:
        image = self.__decode()
        min_0_count = math.inf
        min_0_layer = None
        for layer in image:
            count = 0
            for row in layer:
                count += row.count("0")
            if count < min_0_count:
                min_0_count = count
                min_0_layer = layer

        return min_0_layer
