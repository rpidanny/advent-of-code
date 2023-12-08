package main

import (
	"testing"
)

func TestPart1(t *testing.T) {
	inputs := []string{"input1", "input2", "input3"}
	expectedResult := 123

	result := part1(inputs)

	if result != expectedResult {
		t.Errorf("Part1 did not return the expected result. Expected: %d, Got: %d", expectedResult, result)
	}
}

func TestPart2(t *testing.T) {
	inputs := []string{"input4", "input5", "input6"}
	expectedResult := 456

	result := part2(inputs)

	if result != expectedResult {
		t.Errorf("Part2 did not return the expected result. Expected: %d, Got: %d", expectedResult, result)
	}
}
