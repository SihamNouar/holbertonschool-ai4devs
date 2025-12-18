// Current implementation in PaymentProcessor.js
class PaymentProcessor {
  constructor() {
    this.timeout = 30000; // 30 seconds
    this.retryLimit = 3;
  }

  async processPayment(paymentData) {
    const startTime = Date.now();

    try {
      // Step 1: Validate payment data (200ms avg)
      await this.validatePayment(paymentData);

      // Step 2: Check fraud rules (5s avg - BOTTLENECK!)
      await this.checkFraudRules(paymentData);

      // Step 3: Process with payment gateway (10s avg)
      const result = await this.callPaymentGateway(paymentData);

      // Step 4: Update database (500ms avg)
      await this.updateTransactionRecord(result);

      // Step 5: Send notifications (15s avg - BOTTLENECK!)
      await this.sendNotifications(paymentData, result);

      return result;
    } catch (error) {
      const processingTime = Date.now() - startTime;

      if (processingTime > this.timeout) {
        throw new Error('transaction_timeout');
      }

      throw error;
    }
  }

  async checkFraudRules(paymentData) {
    // Synchronous fraud checks - blocks the entire process
    const rules = await this.getFraudRules(); // 2s

    for (const rule of rules) {
      const result = await this.evaluateRule(rule, paymentData); // 1s per rule
      if (result.isBlocked) {
        throw new Error('fraud_detected');
      }
    }
  }

  async sendNotifications(paymentData, result) {
    // Sequential notification sending
    await this.sendUserEmail(paymentData.email);     // 5s
    await this.sendMerchantWebhook(result);          // 8s
    await this.updateAnalytics(result);              // 2s
  }
}