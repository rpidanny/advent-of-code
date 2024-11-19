import pytest
from inputs import extract_all_numbers, get_inputs


@pytest.fixture
def create_test_file(tmp_path):
    # Create a temporary file with some test data
    test_data = "Line 1\nLine 2\nLine 3"
    file_path = tmp_path / "test_file.txt"
    file_path.write_text(test_data)
    return file_path


def test_get_inputs_valid_file(create_test_file):
    # Test the function with a valid file
    file_path = create_test_file
    result = get_inputs(file_path)
    assert result == ["Line 1", "Line 2", "Line 3"]


def test_get_inputs_empty_file(tmp_path):
    # Test the function with an empty file
    empty_file = tmp_path / "empty_file.txt"
    empty_file.write_text("")
    result = get_inputs(empty_file)
    assert result == []


def test_get_inputs_nonexistent_file():
    # Test the function with a nonexistent file
    with pytest.raises(FileNotFoundError):
        get_inputs("nonexistent_file.txt")


def test_get_inputs_file_with_whitespace(create_test_file, tmp_path):
    # Test the function with a file containing lines with leading/trailing whitespaces
    file_path = create_test_file
    file_with_whitespace = tmp_path / "file_with_whitespace.txt"
    file_with_whitespace.write_text("   Line 1   \n   Line 2   \n   Line 3   ")
    result = get_inputs(file_with_whitespace)
    assert result == ["   Line 1   ", "   Line 2   ", "   Line 3   "]


def test_extract_all_numbers():
    # Test the function to extract all numbers from a string
    input_string = "abc123def-456ghi789"
    result = extract_all_numbers(input_string)
    assert result == ["123", "-456", "789"]

    input_string = "No numbers in this string"
    result = extract_all_numbers(input_string)
    assert result == []

    input_string = "Only one number: 42"
    result = extract_all_numbers(input_string)
    assert result == ["42"]

    input_string = "Multiple numbers: 1, 2, 3, 4, 5"
    result = extract_all_numbers(input_string)
    assert result == ["1", "2", "3", "4", "5"]
