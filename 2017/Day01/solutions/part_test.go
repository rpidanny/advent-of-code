package solutions

import (
	"path/filepath"
	"testing"

	"github.com/rpidanny/advent-of-code/2017/utils"
)

func getInput(path string) []string {
	inputs, err := utils.GetInputs(path)
	if err != nil {
		panic(err)
	}
	return inputs
}

var (
	currentDir, _ = filepath.Abs("../")
	input         = getInput(filepath.Join(currentDir, "input.txt"))
	inputTest     = getInput(filepath.Join(currentDir, "input_test.txt"))
)

func TestPart1_WithTestData(t *testing.T) {
	got := Part1(inputTest)
	want := 9
	if got != want {
		t.Fatalf("Part1(inputTest) = %d; want %d", got, want)
	}
}

func TestPart1_WithRealData(t *testing.T) {
	got := Part1(input)
	want := 1228
	if got != want {
		t.Fatalf("Part1(input) = %d; want %d", got, want)
	}
}

func TestPart2_WithTestData(t *testing.T) {
	got := Part2([]string{"12131415"})
	want := 4
	if got != want {
		t.Fatalf("Part2(inputTest) = %d; want %d", got, want)
	}
}

func TestPart2_WithRealData(t *testing.T) {
	got := Part2(input)
	want := 1238
	if got != want {
		t.Fatalf("Part2(input) = %d; want %d", got, want)
	}
}
