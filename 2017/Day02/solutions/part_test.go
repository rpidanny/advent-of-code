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
	inputTest2     = getInput(filepath.Join(currentDir, "input_test_2.txt"))
)

func TestPart1_WithTestData(t *testing.T) {
	got := Part1(inputTest)
	want := 18
	if got != want {
		t.Fatalf("Part1(inputTest) = %d; want %d", got, want)
	}
}

func TestPart1_WithRealData(t *testing.T) {
	got := Part1(input)
	want := 34581
	if got != want {
		t.Fatalf("Part1(input) = %d; want %d", got, want)
	}
}

func TestPart2_WithTestData(t *testing.T) {
	got := Part2(inputTest2)
	want := 9
	if got != want {
		t.Fatalf("Part2(inputTest) = %d; want %d", got, want)
	}
}

func TestPart2_WithRealData(t *testing.T) {
	got := Part2(input)
	want := 214
	if got != want {
		t.Fatalf("Part2(input) = %d; want %d", got, want)
	}
}
