package solutions

func Part2(lines []string) int {
	num := lines[0]
	n := len(num)
	m := n / 2
	total := 0

	for i := 0; i < n; i++ {
		next := (i + m) % n
		if num[i] == num[next] {
			total += int(num[i] - '0')
		}
	}

	return total
}