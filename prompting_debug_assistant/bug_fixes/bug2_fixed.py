"""bug2_fixed.py

Category: Syntax error (fixed)
"""

def greet(name):
    print("Hello, " + name)


def main():
    names = ["Alice", "Bob", "Charlie"]
    for n in names:
        greet(n)


if __name__ == "__main__":
    main()
