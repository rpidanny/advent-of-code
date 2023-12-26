import os

from solutions import part1, part2

from utils.inputs import get_inputs

current_dir = os.path.dirname(os.path.realpath(__file__))

input = get_inputs(f"{current_dir}/input.txt")


class TestPart1:
    def test_with_real_data(self):
        assert part1(input) == 2064


class TestPart2:
    def test_with_real_data(self, capsys):
        assert part2(input) == None
        captured = capsys.readouterr()
        assert (
            captured.out
            == """
 █    ███  ████ █  █ █     ██  █  █ ███    
 █    █  █    █ █ █  █    █  █ █  █ █  █   
 █    █  █   █  ██   █    █    ████ █  █   
 █    ███   █   █ █  █    █ ██ █  █ ███    
 █    █    █    █ █  █    █  █ █  █ █ █    
 ████ █    ████ █  █ ████  ███ █  █ █  █   
"""
        )
