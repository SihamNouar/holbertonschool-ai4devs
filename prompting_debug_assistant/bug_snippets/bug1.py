

"""bug1.py

Category: last-n-items function (fixed)
"""

def last_n(items, n):
	# Intentional bug: when n == len(items) we return items[1:] (drops first element)
	if n <= 0:
		return []
	if n == len(items):
		# BUG: should return the whole list but returns all except the first
		return items[1:]
	if n > len(items):
		return items[:]
	return items[-n:]


if __name__ == "__main__":
	example = [1, 2, 3, 4, 5]
	print("last 3 (expected [3,4,5]):", last_n(example, 3))
	print("last 5 (expected [1,2,3,4,5]):", last_n(example, 5))
	