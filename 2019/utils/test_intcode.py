from intcode import IntCode, get_program


class TestIntCode:
    def test_get_program(self):
        assert get_program(["1002, 4, 3, 4, 33"]) == {0: 1002, 1: 4, 2: 3, 3: 4, 4: 33}

    # def test_parse_instruction(self):
    #     assert parse_instruction(1002) == (0, 1, 0, 2)
    #     assert parse_instruction(1102) == (0, 1, 1, 2)
    #     assert parse_instruction(1182) == (0, 1, 1, 82)


class TestIntCodeRelativeBase:
    def test_quine(self):
        code = "109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99"

        int_code = IntCode(get_program([code]))
        outputs = int_code.run_until_halt()

        assert outputs == list(map(int, code.split(",")))

    def test_output_large_16digit_number(self):
        int_code = IntCode(get_program(["1102,34915192,34915192,7,4,7,99,0"]))
        outputs = int_code.run_until_halt()

        assert outputs == [1219070632396864]

    def test_output_large_number_from_code(self):
        int_code = IntCode(get_program(["104,1125899906842624,99"]))
        outputs = int_code.run_until_halt()

        assert outputs == [1125899906842624]
