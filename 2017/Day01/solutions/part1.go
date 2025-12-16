package solutions

func Part1(lines []string) int {
	num := lines[0]
	n := len(num)
	total := 0

	for i := 0; i < n; i++ {
		next := (i + 1) % n
		if num[i] == num[next] {
			total += int(num[i] - '0')
		}
	}

	return total
}