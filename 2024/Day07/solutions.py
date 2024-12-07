from bridge_repair import BridgeRepair


def part1(inputs: list[str]) -> int:
    br = BridgeRepair(inputs)
    return br.get_total_calibration(False)


def part2(inputs: list[str]) -> int:
    br = BridgeRepair(inputs)
    return br.get_total_calibration(True)
