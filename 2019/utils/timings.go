package main

import (
	"fmt"
	"time"
)

func formatDuration(duration time.Duration) (float64, string) {
	seconds := duration.Seconds()

	switch {
	case seconds < 1:
		return seconds * 1000, "ms"
	case seconds < 60:
		return seconds, "s"
	case seconds < 3600:
		return seconds / 60, "min"
	default:
		return seconds / 3600, "h"
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

	fmt.Printf("%s: %d %s(%.2f %s)%s\n", name, result, gray, duration, unit, reset)
}
