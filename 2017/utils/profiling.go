package utils

import (
	"fmt"
	"runtime"
	"time"
)

// formatDuration formats milliseconds into a human-readable string
func formatDuration(ms float64) string {
	switch {
	case ms < 1000:
		return fmt.Sprintf("%.3fms", ms)
	case ms < 60*1000:
		return fmt.Sprintf("%.3fs", ms/1000)
	case ms < 60*60*1000:
		return fmt.Sprintf("%.3fmin", ms/(60*1000))
	default:
		return fmt.Sprintf("%.3fh", ms/(60*60*1000))
	}
}

// ProfileRun runs a function and prints time, memory usage
func ProfileRun(name string, f func() interface{}) (interface{}, float64) {
	var memStart, memEnd runtime.MemStats

	// Read initial memory stats
	runtime.ReadMemStats(&memStart)

	start := time.Now()
	result := f()
	elapsed := time.Since(start)

	// Read final memory stats
	runtime.ReadMemStats(&memEnd)

	memChange := float64(memEnd.Alloc-memStart.Alloc) / (1024 * 1024) // MB
	durationMs := float64(elapsed.Milliseconds())

	fmt.Printf(
		"\033[35m%s\033[0m: \033[32m%v\033[0m (Time: %s, Memory change: %.2fMB)\n",
		name,
		result,
		formatDuration(durationMs),
		memChange,
	)

	return result, durationMs
}
