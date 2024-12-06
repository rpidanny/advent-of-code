from printer_queue import PrinterQueue


def part1(inputs: list[str]) -> int:
    pq = PrinterQueue(inputs)
    correct_updates = pq.get_correct_updates()
    return pq.get_sum_of_median(correct_updates)


def part2(inputs: list[str]) -> int:
    pq = PrinterQueue(inputs)
    incorrect_updates = pq.get_incorrect_updates()
    fixed_updates = list(map(pq.fix_incorrect_update, incorrect_updates))
    return pq.get_sum_of_median(fixed_updates)
