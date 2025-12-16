package main

import (
	"os"
	"path/filepath"

	"github.com/rpidanny/advent-of-code/2017/Day01/solutions"
	"github.com/rpidanny/advent-of-code/2017/utils"
)

func main() {
	dir, err := os.Getwd()
	if err != nil {
		panic(err)
	}

	inputPath := filepath.Join(dir, "input.txt")

	inputs, err := utils.GetInputs(inputPath)
	if err != nil {
		panic(err)
	}

	utils.ProfileRun("Part 1", func() interface{} {
		return solutions.Part1(inputs)
	})

	utils.ProfileRun("Part 2", func() interface{} {
		return solutions.Part2(inputs)
	})
}
