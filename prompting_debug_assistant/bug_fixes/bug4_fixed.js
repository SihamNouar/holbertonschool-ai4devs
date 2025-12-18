// Fixed PaymentProcessor.js
class PaymentProcessor {
  constructor() {
    this.timeout = 30000; // 30 seconds
    this.retryLimit = 3;
  }

  async processPayment(paymentData) {
    // Enforce a real timeout for the whole payment flow
    return this.withTimeout(this.processPaymentCore(paymentData), this.timeout, "transaction_timeout");
  }

  async processPaymentCore(paymentData) {
    // Step 1: Validate payment data (200ms avg)
    await this.validatePayment(paymentData);

    // Step 2: Check fraud rules (opt: parallel with limited concurrency)
    await this.checkFraudRules(paymentData);

    // Step 3: Process with payment gateway (10s avg)
    const result = await this.callPaymentGateway(paymentData);

    // Step 4: Update database (500ms avg)
    await this.updateTransactionRecord(result);

    // Step 5: Send notifications (NON-BLOCKING)
    this.sendNotifications(paymentData, result).catch((err) => {
      // Don't fail the transaction because notifications failed
      console.error("[WARN] notification_failed", {
        transactionId: result?.transactionId,
        error: err?.message || String(err),
      });
    });

    return result;
  }

  withTimeout(promise, timeoutMs, timeoutMessage) {
    let timeoutId;

    const timeoutPromise = new Promise((_, reject) => {
      timeoutId = setTimeout(() => reject(new Error(timeoutMessage)), timeoutMs);
    });

    // Ensure we clear the timer no matter what
    return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timeoutId));
  }

  async checkFraudRules(paymentData) {
    // Still blocks until fraud checks finish, but faster if rules are independent
    const rules = await this.getFraudRules(); // ~2s

    // Evaluate rules with limited concurrency (avoid unbounded Promise.all)
    await this.evaluateRulesWithConcurrency(rules, paymentData, 4);
  }

  async evaluateRulesWithConcurrency(rules, paymentData, concurrency = 4) {
    let index = 0;
    let blockedError = null;

    const worker = async () => {
      while (true) {
        if (blockedError) return;

        const i = index++;
        if (i >= rules.length) return;

        const rule = rules[i];
        const result = await this.evaluateRule(rule, paymentData); // ~1s per rule

        if (result?.isBlocked) {
          blockedError = new Error("fraud_detected");
          return;
        }
      }
    };

    const workers = Array.from({ length: Math.min(concurrency, rules.length) }, worker);
    await Promise.all(workers);

    if (blockedError) throw blockedError;
  }

  async sendNotifications(paymentData, result) {
    // Can also be parallelized since these are independent
    await Promise.all([
      this.sendUserEmail(paymentData.email),
      this.sendMerchantWebhook(result),
      this.updateAnalytics(result),
    ]);
  }

  // ---- existing methods assumed ----
  async validatePayment(paymentData) {}
  async getFraudRules() {}
  async evaluateRule(rule, paymentData) {}
  async callPaymentGateway(paymentData) {}
  async updateTransactionRecord(result) {}
  async sendUserEmail(email) {}
  async sendMerchantWebhook(result) {}
  async updateAnalytics(result) {}
}
