import os
from time import perf_counter
from typing import Callable, Tuple, TypeVar

import psutil
from termcolor import colored

T = TypeVar("T")


def format_duration(milliseconds: float) -> str:
    if milliseconds < 1000:
        return f"{milliseconds:.3f}ms"
    elif milliseconds < 60 * 1000:
        return f"{milliseconds / 1000:.3f}s"
    elif milliseconds < 60 * 60 * 1000:
        return f"{milliseconds / (60 * 1000):.3f}min"
    else:
        return f"{milliseconds / (60 * 60 * 1000):.3f}h"


def profile_run(name: str, func: Callable[[], T]) -> Tuple[T, float]:
    process = psutil.Process(os.getpid())  # Get the current process
    start_cpu = process.cpu_percent(interval=None)  # Initial CPU usage
    start_memory = process.memory_info().rss / (1024 * 1024)  # Initial memory in MB

    start = perf_counter()
    result = func()
    end = perf_counter()

    end_cpu = process.cpu_percent(interval=None)  # Final CPU usage
    end_memory = process.memory_info().rss / (1024 * 1024)  # Final memory in MB

    duration = (end - start) * 1000
    cpu_usage = end_cpu - start_cpu  # CPU usage percentage
    memory_change = end_memory - start_memory  # Memory change in MB

    print(
        f"{colored(name, 'magenta')}: {colored(result, 'green')} "
        f"{colored(f'(Time: {format_duration(duration)}, Memory: {memory_change:.2f}MB, CPU: {cpu_usage:.2f}%)', 'light_grey', attrs=['dark'])}"
    )

    return result, duration
