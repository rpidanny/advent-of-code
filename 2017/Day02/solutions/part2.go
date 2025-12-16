package solutions

import (
	"sort"
	"strconv"
	"strings"
)

func Part2(lines []string) int {
	checksum := 0

	for _, line := range lines {
		fields := strings.Split(line, "\t")
		nums := make([]int, 0, len(fields))

		for _, f := range fields {
			v, _ := strconv.Atoi(f)
			nums = append(nums, v)
		}

		sort.Ints(nums)
		n := len(nums)

		for i := 0; i < n-1; i++ {
			for j := i + 1; j < n; j++ {
				if nums[j]%nums[i] == 0 {
					checksum += nums[j] / nums[i]
					break // only one evenly divisible pair per line
				}
			}
		}
	}

	return checksum
}