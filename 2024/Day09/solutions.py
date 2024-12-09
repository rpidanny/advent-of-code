from disk_fragmenter import DiskFragmenter


def part1(inputs: list[str]) -> int:
    df = DiskFragmenter(inputs)
    df.defrag_blocks()
    return df.get_checksum()


def part2(inputs: list[str]) -> int:
    df = DiskFragmenter(inputs)
    df.defrag_files()
    return df.get_checksum()
