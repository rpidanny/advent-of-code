package main

func main() {
	input := readInput("./input.txt")

	runFunc("Part 1", func() int { return part1(input) })
	runFunc("Part 2", func() int { return part2(input) })
}
