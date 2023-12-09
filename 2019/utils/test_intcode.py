from intcode import get_program, parse_instruction


class TestIntCode:
    def test_get_program(self):
        assert get_program(["1002, 4, 3, 4, 33"]) == [1002, 4, 3, 4, 33]

    def test_parse_instruction(self):
        assert parse_instruction(1002) == (0, 1, 0, 2)
        assert parse_instruction(1102) == (0, 1, 1, 2)
        assert parse_instruction(1182) == (0, 1, 1, 82)
