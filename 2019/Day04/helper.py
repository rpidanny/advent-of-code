def is_valid_password(password: int, digits_rule: bool) -> bool:
    password = str(password)
    digits = set(password)

    if len(digits) == len(password):
        return False

    if any([password[i] < password[i - 1] for i in range(1, len(password))]):
        return False

    if digits_rule and not (2 in [password.count(d) for d in digits]):
        return False

    return True


def count_valid_passwords(lower: int, upper: int, digits_rule: bool) -> int:
    count = 0

    for i in range(lower, upper + 1):
        if is_valid_password(i, digits_rule):
            count += 1

    return count
