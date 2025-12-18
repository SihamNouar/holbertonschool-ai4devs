
## Bug 1 – bug1_fixed.py

- **Input**: [1,2,3,4,5], n=3  
- **Expected Output**: [3,4,5]  
- **Actual Output**: [3,4,5]

- **Input**: [1,2,3,4,5], n=5  
- **Expected Output**: [1,2,3,4,5]  
- **Actual Output**: [1,2,3,4,5] 

## Bug 2 – bug2_fixed.py

- **Input**: ["Alice", "Bob", "Charlie"]  
- **Expected Output**:  
  Hello, Alice  
  Hello, Bob  
  Hello, Charlie  

- **Actual Output**:  
  Hello, Alice  
  Hello, Bob  
  Hello, Charlie  

## Bug 3 – bug3_fixed.py

- **Input**: (10, 2)  
- **Expected Output**: 5.0  
- **Actual Output**: 5.0 

- **Input**: (5, 0)  
- **Expected Output**: handled safely (no crash)  
- **Actual Output**: undefined (division by zero)

- **Input**: (3, 1)  
- **Expected Output**: 3.0  
- **Actual Output**: 3.0 

## Bug 4 – bug4_fixed.js
- **Input**:  
  `paymentData` with normal values; total processing time ≈ **35s** (fraud checks + gateway + notifications), timeout = **30s**

- **Expected Output**:  
  Transaction **succeeds** (payment processed and DB updated), or fails **only** if a real timeout is reached. Non-critical notifications must not cause a timeout.

- **Actual Output**:  
  Transaction **succeeds within timeout**, notifications run asynchronously, no false `transaction_timeout` error ✅
