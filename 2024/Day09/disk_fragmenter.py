import os

from colors import get_colored_char

from utils.output import print_grid


class DiskFragmenter:
    def __init__(self, lines: list[str]):
        self.storage, self.file_size_map = self._parse_input(lines[0])
        self.visualize = os.getenv("VISUALIZE", "False").lower() == "true"

    def _parse_input(self, disk_map: str):
        storage = []
        file_size_map = {}
        idx = 0
        for i, char in enumerate(disk_map):
            size = int(char)
            storage.extend([idx] * size if i % 2 == 0 else ["."] * size)
            if i % 2 == 0:
                file_size_map[idx] = size
                idx += 1
        return storage, file_size_map

    def _print_storage(self):
        print_grid(
            [self.storage],
            delay=0.0002,
            padding=False,
            mapper=lambda x: (get_colored_char(x) if x != "." else " "),
        )

    def defrag_blocks(self):
        l, r = 0, len(self.storage) - 1
        while l < r:
            if self.storage[l] == ".":
                while self.storage[r] == "." and l < r:
                    r -= 1
                self.storage[l], self.storage[r] = self.storage[r], self.storage[l]
            l += 1

    def _defrag_file(self, id: int):
        file_size = self.file_size_map[id]
        empty_idx, count = 0, 0
        file_idx = self.storage.index(id)

        for i, char in enumerate(self.storage[:file_idx]):
            if char == ".":
                count += 1
                if count == 1:
                    empty_idx = i
                if count == file_size:
                    for j in range(file_size):
                        self.storage[empty_idx + j], self.storage[file_idx + j] = (
                            self.storage[file_idx + j],
                            self.storage[empty_idx + j],
                        )
                        self.visualize and self._print_storage()
                    break
            else:
                count = 0

    def defrag_files(self):
        for id in range(len(self.file_size_map) - 1, 0, -1):
            self._defrag_file(id)

    def get_checksum(self) -> int:
        return sum(
            i * int(block) for i, block in enumerate(self.storage) if block != "."
        )
