
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

## Bug 4 – bug4.js

**Intended Behavior**:  
`processPayment()` should either complete successfully within the configured 30-second timeout or fail explicitly *because* a real timeout occurred. Non-critical work (notifications) should not cause the transaction to exceed the timeout, and real underlying errors should not be misclassified.

**Issue Type**:  
Logic error / architectural bug (incorrect timeout handling).

**Notes**:  
- The `timeout` value is **not enforced**; it is only checked after execution completes or throws.  
- If total processing exceeds 30 seconds due to slow steps (`checkFraudRules`, `sendNotifications`), the request can be terminated upstream (HTTP gateway / load balancer), leading to misleading `transaction_timeout` errors.  
- The `catch` block **relabels any error occurring after 30 seconds** as `transaction_timeout`, masking real failures (e.g. gateway, DB, notification errors).  
- `sendNotifications()` (~15s) is executed synchronously in the critical path, making timeouts inevitable under normal conditions.



