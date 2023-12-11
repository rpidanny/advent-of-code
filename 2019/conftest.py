import sys
import time

import pytest


def pytest_sessionstart():
    sys.path.append("utils")


def format_time(execution_time):
    if execution_time >= 1:
        return f"{execution_time:.2f}s"
    return f"{(execution_time * 1000):.2f}ms"


def should_print_execution_time(config):
    return config.getoption("-v") == 1 or config.getoption("--verbose") == 1


@pytest.hookimpl(hookwrapper=True, tryfirst=True)
def pytest_runtest_call(item):
    if not should_print_execution_time(item.config):
        yield
    else:
        start_time = time.time()
        yield
        end_time = time.time()
        execution_time = end_time - start_time
        print(f"\033[3;90m(executed in {format_time(execution_time)}) \033[0m", end="")
