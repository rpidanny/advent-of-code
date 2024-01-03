from fft import FlawedFrequencyTransmission


def part1(inputs: list[str], times=100) -> int:
    fft = FlawedFrequencyTransmission(inputs[0])
    return fft.apply(times)


def part2(inputs: list[str], times=100) -> int:
    fft = FlawedFrequencyTransmission(inputs[0])
    return fft.apply(times, 7)
