"""bug1_fixed.py

Category: last-n-items function (fixed)
"""

def last_n(items, n):
    if n <= 0:
        return []
    if n >= len(items):
        return items[:]
    return items[-n:]


if __name__ == "__main__":
    example = [1, 2, 3, 4, 5]
    print("last 3 (expected [3,4,5]):", last_n(example, 3))
    print("last 5 (expected [1,2,3,4,5]):", last_n(example, 5))
