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

	// FIX 1: Prevent integer underflow on Memory
	// If GC runs, End.Alloc might be less than Start.Alloc.
	// Casting to int64 allows for negative numbers (freed memory).
	memDiff := int64(memEnd.Alloc) - int64(memStart.Alloc)
	memChange := float64(memDiff) / (1024 * 1024) // MB

	// FIX 2: High Precision Timing
	// We use Nanoseconds() and divide by 1e6 to get fractional milliseconds.
	// Previous code used Milliseconds() which truncated 0.9ms to 0ms.
	durationMs := float64(elapsed.Nanoseconds()) / 1e6

	fmt.Printf(
		"\033[35m%s\033[0m: \033[32m%v\033[0m (Time: %s, Memory change: %.4fMB)\n",
		name,
		result,
		formatDuration(durationMs),
		memChange,
	)

	return result, durationMs
}