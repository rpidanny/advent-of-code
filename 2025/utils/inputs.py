import re


def get_inputs(file_name: str) -> list[str]:
    with open(file_name) as f:
        input = f.read().splitlines()
    return input


def extract_all_numbers(input_string):
    # Define a regular expression pattern to match numbers (including negatives)
    pattern = r"-?\d+"

    # Use re.findall() to find all matches in the input string
    numbers = re.findall(pattern, input_string)

    return numbers
