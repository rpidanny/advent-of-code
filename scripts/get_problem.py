import argparse
import os
import sys

import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv
from markdownify import markdownify as md


def get_problem(year, day):
    load_dotenv(".env.local")
    session_cookie = os.environ.get("AOC_SESSION")
    if not session_cookie:
        print("Error: AOC_SESSION environment variable not set.")
        sys.exit(1)

    url = f"https://adventofcode.com/{year}/day/{day}"
    cookies = {"session": session_cookie}
    headers = {"User-Agent": "github.com/rpidanny/advent-of-code by abhishekmaharjan"}

    print(
        f"Using session cookie: {session_cookie[:5]}...{session_cookie[-5:] if len(session_cookie) > 10 else ''}"
    )

    try:
        response = requests.get(url, cookies=cookies, headers=headers)
        response.raise_for_status()
    except requests.RequestException as e:
        print(f"Error fetching URL {url}: {e}")
        sys.exit(1)

    if "Log Out" not in response.text:
        print("WARNING: It seems you are NOT logged in. Check your AOC_SESSION cookie.")
    else:
        print("Successfully logged in.")

    soup = BeautifulSoup(response.text, "html.parser")
    main_content = soup.find("main")

    if not main_content:
        print("Error: Could not find <main> tag in response.")
        sys.exit(1)

    markdown_content = ""

    # Iterate over direct children of main to preserve order of parts and answers
    for child in main_content.children:
        if child.name == "article" and "day-desc" in child.get("class", []):
            markdown_content += md(str(child)) + "\n\n"
        elif child.name == "p" and "Your puzzle answer was" in child.get_text():
            markdown_content += md(str(child)) + "\n\n"
        elif (
            child.name == "p"
            and "Both parts of this puzzle are complete!" in child.get_text()
        ):
            markdown_content += md(str(child)) + "\n\n"

    if not markdown_content:
        print("Error: No content found. Check if the day is unlocked.")
        sys.exit(1)

    # Format directory path: <year>/Day<day_padded>
    day_padded = f"{int(day):02d}"
    dir_path = os.path.join(str(year), f"Day{day_padded}")

    if not os.path.exists(dir_path):
        print(f"Directory {dir_path} does not exist. Creating it...")
        os.makedirs(dir_path, exist_ok=True)

    file_path = os.path.join(dir_path, "README.md")

    try:
        with open(file_path, "w") as f:
            f.write(markdown_content)
        print(f"Successfully saved problem description to {file_path}")
    except IOError as e:
        print(f"Error writing to file {file_path}: {e}")
        sys.exit(1)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Fetch Advent of Code problem description."
    )
    parser.add_argument("year", type=int, help="The year of the event (e.g., 2024)")
    parser.add_argument("day", type=int, help="The day of the problem (e.g., 1)")

    args = parser.parse_args()

    get_problem(args.year, args.day)
