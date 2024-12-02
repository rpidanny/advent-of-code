from red_nosed_reports import RedNosedReports


def part1(inputs: list[str]) -> int:
    red_nosed_reports = RedNosedReports(inputs)
    return red_nosed_reports.get_num_of_safe_reports()


def part2(inputs: list[str]) -> int:
    red_nosed_reports = RedNosedReports(inputs)
    return red_nosed_reports.get_num_of_safe_reports_with_removal()
