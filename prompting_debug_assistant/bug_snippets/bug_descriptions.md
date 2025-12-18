
## Bug 1 – bug1.py
**Intended Behavior**:  returns the last `n` items of a list.
**Issue Type**: Logical / boundary-case error.
**Notes**: The function fails when `n == len(items)`.

## Bug 2 – bug2.py
**Intended Behavior**: Define a `greet(name)` function that prints a greeting string (e.g., "Hello, Alice") and a `main()` that loops over a list of names, calling `greet` for each. Running the script should print one greeting per name.
**Issue Type**: Syntax error.
**Notes**: missing colon in the `def greet(name)` declaration which raises `SyntaxError`.

## Bug 3 – bug3.py
**Intended Behavior**: Implement `compute_ratio(a, b)` to return `a / b`. The example runner should either skip pairs where `b == 0` or catch `ZeroDivisionError` and handle it gracefully, printing valid results only.
**Issue Type**: Runtime exception.
**Notes**: The sample `pairs` list contains a `(5, 0)` pair which triggers `ZeroDivisionError` at runtime.




