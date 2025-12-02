from typing import Counter


class IdChecker:
    def sum_invalid_ids(self, start: str, end: str) -> int:
        curr_num, end_num, res = int(start), int(end), 0
        while curr_num <= end_num:
            curr_str = str(curr_num)
            n = len(curr_str)
            if n % 2 == 0:
                l, r = 0, n // 2
                while r < n and curr_str[l] == curr_str[r]:
                    l, r = l + 1, r + 1
                # pattern found
                if r == n:
                    res += curr_num
            curr_num += 1
        return res

    def sum_invalid_ids_v2(self, start: str, end: str) -> int:
        curr_num, end_num, res = int(start), int(end), 0
        while curr_num <= end_num:
            curr_str = str(curr_num)
            n, c = len(curr_str), Counter(curr_str)
            frequencies = list(c.values())
            req_length = min(frequencies)
            num_seq = n // req_length
            if req_length > 1 and n % req_length == 0:
                i = 0
                while i < num_seq:
                    j = 1
                    while j < req_length:
                        if curr_str[i] != curr_str[i + j * num_seq]:
                            break
                        j += 1
                    if j != req_length:
                        break
                    i += 1
                if i == num_seq:
                    res += curr_num
            curr_num += 1
        return res
