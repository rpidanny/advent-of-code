from time import perf_counter
from typing import Callable, Tuple, TypeVar

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
    start = perf_counter()
    result = func()
    end = perf_counter()
    duration = (end - start) * 1000

    print(
        f"{colored(name, 'magenta')}: {colored(result, 'green')} {colored(f'(executed in {format_duration(duration)})', 'light_grey', attrs=['dark'])}"
    )

    return result, duration
