
def compute_ratio(a, b):
    return a / b


def main():
    pairs = [(10, 2), (5, 0), (3, 1)]
    for a, b in pairs:
        print(f"{a}/{b} = {compute_ratio(a, b)}")


if __name__ == "__main__":
    main()
