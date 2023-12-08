package main

import (
	"os"
	"strings"
)

func readInput(filename string) []string {
	lines := []string{}

	fileContent, err := os.ReadFile(filename)
	if err != nil {
		panic(err)
	}

	lines = strings.Split(string(fileContent), "\n")
	return lines
}
