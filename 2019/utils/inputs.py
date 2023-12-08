def get_inputs(file_name: str) -> list[str]:
    with open(file_name) as f:
        input = f.readlines()
    return input
