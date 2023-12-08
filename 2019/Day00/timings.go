package main

import (
	"fmt"
	"time"
)

func formatDuration(duration time.Duration) (float64, string) {
	ms := duration.Milliseconds()

	switch {
	case ms < 1000:
		return float64(ms), "ms"
	case ms < 60*1000:
		return float64(ms) / 1000, "s"
	case ms < 60*60*1000:
		return float64(ms) / 1000 * 60, "min"
	default:
		return float64(ms) / 60 * 60 * 1000, "h"
	}
}

func runFunc(name string, f func() int) {
	start := time.Now()
	result := f()
	end := time.Now()
	elapsed := end.Sub(start)

	duration, unit := formatDuration(elapsed)

	// ANSI escape code for setting text color to gray
	gray := "\033[90m"

	// ANSI escape code for resetting text color
	reset := "\033[0m"

	fmt.Printf("%s: %d %s(%.3f %s)%s\n", name, result, gray, duration, unit, reset)
}
