package solutions

import (
	"math"
	"strconv"
	"strings"
)

func Part1(lines []string) int {
	checksum := 0

	for _, line := range lines {
		fields := strings.Split(line, "\t")

		minVal, maxVal := math.MaxInt, 0
		for _, f := range fields {
			v, _ := strconv.Atoi(f)
			if v < minVal {
				minVal = v
			}
			if v > maxVal {
				maxVal = v
			}
		}

		checksum += maxVal - minVal
	}

	return checksum
}