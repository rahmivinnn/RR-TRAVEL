// @ts-ignore - midtrans-client doesn't have TypeScript definitions
import midtransClient from 'midtrans-client';
import { v4 as uuidv4 } from 'uuid';
import type { PaymentMethod } from '@shared/schema';

export interface MidtransConfig {
  serverKey: string;
  clientKey: string;
  isProduction: boolean;
}

export interface PaymentRequest {
  orderId: string;
  amount: number;
  customerDetails: {
    first_name: string;
    last_name?: string;
    email: string;
    phone: string;
  };
  itemDetails: {
    id: string;
    price: number;
    quantity: number;
    name: string;
  }[];
  paymentMethod?: PaymentMethod;
}

export interface PaymentResponse {
  token: string;
  redirect_url: string;
  order_id: string;
  gross_amount: string;
  payment_type?: string;
  transaction_status: string;
  fraud_status?: string;
}

class MidtransService {
  private snap: any;
  private core: any;
  
  constructor(config: MidtransConfig) {
    // Initialize Snap API for payment UI
    this.snap = new midtransClient.Snap({
      isProduction: config.isProduction,
      serverKey: config.serverKey,
      clientKey: config.clientKey
    });
    
    // Initialize Core API for direct API calls
    this.core = new midtransClient.CoreApi({
      isProduction: config.isProduction,
      serverKey: config.serverKey,
      clientKey: config.clientKey
    });
  }

  /**
   * Create payment transaction with Midtrans
   */
  async createTransaction(paymentRequest: PaymentRequest): Promise<PaymentResponse> {
    try {
      const transactionDetails = {
        transaction_details: {
          order_id: paymentRequest.orderId,
          gross_amount: paymentRequest.amount
        },
        customer_details: {
          first_name: paymentRequest.customerDetails.first_name,
          last_name: paymentRequest.customerDetails.last_name || '',
          email: paymentRequest.customerDetails.email,
          phone: paymentRequest.customerDetails.phone
        },
        item_details: paymentRequest.itemDetails,
        credit_card: {
          secure: true
        },
        // Enable specific payment methods
        enabled_payments: this.getEnabledPayments(paymentRequest.paymentMethod),
        custom_expiry: {
          order_time: new Date().toISOString(),
          expiry_duration: 24,
          unit: "hour"
        }
      };

      console.log('Creating Midtrans transaction:', JSON.stringify(transactionDetails, null, 2));
      
      const transaction = await this.snap.createTransaction(transactionDetails);
      
      return {
        token: transaction.token,
        redirect_url: transaction.redirect_url,
        order_id: paymentRequest.orderId,
        gross_amount: paymentRequest.amount.toString(),
        transaction_status: 'pending'
      };
    } catch (error: any) {
      console.error('Midtrans transaction creation failed:', error);
      throw new Error(`Payment creation failed: ${error?.message || 'Unknown error'}`);
    }
  }

  /**
   * Get transaction status from Midtrans
   */
  async getTransactionStatus(orderId: string): Promise<any> {
    try {
      const response = await this.core.transaction.status(orderId);
      return response;
    } catch (error: any) {
      console.error('Failed to get transaction status:', error);
      throw new Error(`Failed to get payment status: ${error?.message || 'Unknown error'}`);
    }
  }

  /**
   * Cancel transaction
   */
  async cancelTransaction(orderId: string): Promise<any> {
    try {
      const response = await this.core.transaction.cancel(orderId);
      return response;
    } catch (error: any) {
      console.error('Failed to cancel transaction:', error);
      throw new Error(`Failed to cancel payment: ${error?.message || 'Unknown error'}`);
    }
  }

  /**
   * Expire transaction
   */
  async expireTransaction(orderId: string): Promise<any> {
    try {
      const response = await this.core.transaction.expire(orderId);
      return response;
    } catch (error: any) {
      console.error('Failed to expire transaction:', error);
      throw new Error(`Failed to expire payment: ${error?.message || 'Unknown error'}`);
    }
  }

  /**
   * Verify webhook notification
   */
  verifyNotification(notification: any): boolean {
    try {
      const serverKey = this.snap.apiConfig.serverKey;
      const orderId = notification.order_id;
      const statusCode = notification.status_code;
      const grossAmount = notification.gross_amount;
      
      const input = orderId + statusCode + grossAmount + serverKey;
      const crypto = require('crypto');
      const hash = crypto.createHash('sha512').update(input).digest('hex');
      
      return hash === notification.signature_key;
    } catch (error) {
      console.error('Webhook verification failed:', error);
      return false;
    }
  }

  /**
   * Get enabled payment methods based on preference
   */
  private getEnabledPayments(preferredMethod?: PaymentMethod): string[] {
    const allMethods = [
      "gopay", "shopeepay", "ovo", "dana", "linkaja", // E-wallets
      "qris", // QR Code
      "permata_va", "bca_va", "bni_va", "bri_va", "other_va", // Virtual Account
      "credit_card", // Credit Card
      "cstore", // Convenience Store
      "akulaku" // Credit
    ];

    if (preferredMethod) {
      // If specific method requested, prioritize it but allow others as fallback
      const methodMap: Record<PaymentMethod, string[]> = {
        "gopay": ["gopay"],
        "ovo": ["ovo"], 
        "qris": ["qris"],
        "shopeepay": ["shopeepay"],
        "dana": ["dana"],
        "linkaja": ["linkaja"],
        "bank_transfer": ["permata_va", "bca_va", "bni_va", "bri_va"],
        "credit_card": ["credit_card"]
      };

      return methodMap[preferredMethod] || allMethods;
    }

    return allMethods;
  }

  /**
   * Format transaction for database storage
   */
  formatTransactionResponse(response: any) {
    return {
      transaction_id: response.transaction_id,
      order_id: response.order_id,
      payment_type: response.payment_type,
      transaction_status: response.transaction_status,
      fraud_status: response.fraud_status,
      gross_amount: response.gross_amount,
      currency: response.currency || 'IDR',
      transaction_time: response.transaction_time,
      settlement_time: response.settlement_time,
      status_code: response.status_code,
      status_message: response.status_message
    };
  }
}

// Create singleton instance
let midtransService: MidtransService | null = null;

export function createMidtransService(): MidtransService {
  if (!midtransService) {
    const config: MidtransConfig = {
      serverKey: process.env.MIDTRANS_SERVER_KEY || '',
      clientKey: process.env.MIDTRANS_CLIENT_KEY || '',
      isProduction: process.env.NODE_ENV === 'production'
    };

    if (!config.serverKey || !config.clientKey) {
      throw new Error('Midtrans API keys are required. Please set MIDTRANS_SERVER_KEY and MIDTRANS_CLIENT_KEY environment variables.');
    }

    midtransService = new MidtransService(config);
  }

  return midtransService;
}

export function generateOrderId(prefix: string = 'RRT'): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

export default MidtransService;