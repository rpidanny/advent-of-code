import os

import pytest
from image_processor import ImageProcessor
from solutions import part1, part2

from utils.inputs import get_inputs

current_dir = os.path.dirname(os.path.realpath(__file__))

input = get_inputs(f"{current_dir}/input.txt")


@pytest.mark.skip(reason="complete")
class TestPart1:
    def test_image_processor(self):
        image_processor = ImageProcessor(3, 2, "123456789012")
        assert image_processor.__decode() == [
            [["1", "2", "3"], ["4", "5", "6"]],
            [["7", "8", "9"], ["0", "1", "2"]],
        ]
        assert image_processor.get_1_by_2_count() == 1

    def test_with_real_data(self):
        assert part1(input) == 2413


class TestPart2:
    def test_image_processor(self):
        ip = ImageProcessor(2, 2, "0222112222120000")
        assert ip.render() == [["0", "1"], ["1", "0"]]

    def test_with_test_data(self):
        ip = ImageProcessor(2, 2, "0222112222120000")
        assert ip.render() == [["0", "1"], ["1", "0"]]

    def test_with_real_data(self):
        ip = ImageProcessor(25, 6, input[0])

        assert ip.render() == [
            [
                "1",
                "1",
                "1",
                "0",
                "0",
                "0",
                "1",
                "1",
                "0",
                "0",
                "1",
                "1",
                "1",
                "0",
                "0",
                "1",
                "1",
                "1",
                "1",
                "0",
                "1",
                "1",
                "1",
                "0",
                "0",
            ],
            [
                "1",
                "0",
                "0",
                "1",
                "0",
                "1",
                "0",
                "0",
                "1",
                "0",
                "1",
                "0",
                "0",
                "1",
                "0",
                "0",
                "0",
                "0",
                "1",
                "0",
                "1",
                "0",
                "0",
                "1",
                "0",
            ],
            [
                "1",
                "1",
                "1",
                "0",
                "0",
                "1",
                "0",
                "0",
                "0",
                "0",
                "1",
                "0",
                "0",
                "1",
                "0",
                "0",
                "0",
                "1",
                "0",
                "0",
                "1",
                "1",
                "1",
                "0",
                "0",
            ],
            [
                "1",
                "0",
                "0",
                "1",
                "0",
                "1",
                "0",
                "0",
                "0",
                "0",
                "1",
                "1",
                "1",
                "0",
                "0",
                "0",
                "1",
                "0",
                "0",
                "0",
                "1",
                "0",
                "0",
                "1",
                "0",
            ],
            [
                "1",
                "0",
                "0",
                "1",
                "0",
                "1",
                "0",
                "0",
                "1",
                "0",
                "1",
                "0",
                "0",
                "0",
                "0",
                "1",
                "0",
                "0",
                "0",
                "0",
                "1",
                "0",
                "0",
                "1",
                "0",
            ],
            [
                "1",
                "1",
                "1",
                "0",
                "0",
                "0",
                "1",
                "1",
                "0",
                "0",
                "1",
                "0",
                "0",
                "0",
                "0",
                "1",
                "1",
                "1",
                "1",
                "0",
                "1",
                "1",
                "1",
                "0",
                "0",
            ],
        ]
