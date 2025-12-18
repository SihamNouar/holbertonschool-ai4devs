"""bug2.py

Category: Syntax error

This file contains a deliberate syntax error (missing colon after `def`).
"""

def greet(name)
    print("Hello, " + name)


def main():
    names = ["Alice", "Bob", "Charlie"]
    for n in names:
        greet(n)


if __name__ == "__main__":
    main()
