package utils

import (
	"os"
	"path/filepath"
	"reflect"
	"testing"
)

func TestGetInputs(t *testing.T) {
	// Create a temporary directory for test files
	tmpDir := t.TempDir()

	// Helper to create a test file with given content
	createTestFile := func(name string, content string) string {
		path := filepath.Join(tmpDir, name)
		if err := os.WriteFile(path, []byte(content), 0644); err != nil {
			t.Fatalf("failed to create test file: %v", err)
		}
		return path
	}

	t.Run("Normal file", func(t *testing.T) {
		path := createTestFile("normal.txt", "line1\nline2\nline3")
		got, err := GetInputs(path)
		if err != nil {
			t.Fatalf("expected no error, got %v", err)
		}
		want := []string{"line1", "line2", "line3"}
		if !reflect.DeepEqual(got, want) {
			t.Errorf("got %v, want %v", got, want)
		}
	})

	t.Run("Empty file", func(t *testing.T) {
		path := createTestFile("empty.txt", "")
		got, err := GetInputs(path)
		if err != nil {
			t.Fatalf("expected no error, got %v", err)
		}
		if len(got) != 0 {
			t.Errorf("expected empty slice, got %v", got)
		}
	})

	t.Run("Non-existent file", func(t *testing.T) {
		path := filepath.Join(tmpDir, "doesnotexist.txt")
		_, err := GetInputs(path)
		if err == nil {
			t.Fatalf("expected error for non-existent file, got nil")
		}
	})
}
