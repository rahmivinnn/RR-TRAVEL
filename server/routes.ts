import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertInquirySchema, insertTravelPackageSchema, insertBookingSchema, insertPaymentSchema } from "@shared/schema";
import { createMidtransService, generateOrderId } from "./midtrans";

export async function registerRoutes(app: Express): Promise<Server> {
  // Travel Packages routes
  app.get("/api/packages", async (req, res) => {
    try {
      const packages = await storage.getTravelPackages();
      res.json(packages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch travel packages" });
    }
  });

  app.get("/api/packages/:id", async (req, res) => {
    try {
      const pkg = await storage.getTravelPackage(req.params.id);
      if (!pkg) {
        return res.status(404).json({ message: "Travel package not found" });
      }
      res.json(pkg);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch travel package" });
    }
  });

  app.post("/api/packages", async (req, res) => {
    try {
      const result = insertTravelPackageSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid package data", errors: result.error.errors });
      }

      const pkg = await storage.createTravelPackage(result.data);
      res.status(201).json(pkg);
    } catch (error) {
      res.status(500).json({ message: "Failed to create travel package" });
    }
  });

  // Inquiries routes
  app.get("/api/inquiries", async (req, res) => {
    try {
      const inquiries = await storage.getInquiries();
      res.json(inquiries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch inquiries" });
    }
  });

  app.post("/api/inquiries", async (req, res) => {
    try {
      const result = insertInquirySchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid inquiry data", errors: result.error.errors });
      }

      const inquiry = await storage.createInquiry(result.data);
      res.status(201).json(inquiry);
    } catch (error) {
      res.status(500).json({ message: "Failed to create inquiry" });
    }
  });

  // Bookings routes
  app.get("/api/bookings", async (req, res) => {
    try {
      const bookings = await storage.getBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });

  app.get("/api/bookings/:id", async (req, res) => {
    try {
      const booking = await storage.getBooking(req.params.id);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      res.json(booking);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch booking" });
    }
  });

  app.post("/api/bookings", async (req, res) => {
    try {
      const result = insertBookingSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid booking data", errors: result.error.errors });
      }

      const booking = await storage.createBooking(result.data);
      res.status(201).json(booking);
    } catch (error) {
      res.status(500).json({ message: "Failed to create booking" });
    }
  });

  // Payment routes
  app.post("/api/payments/create", async (req, res) => {
    try {
      const { bookingId, customerDetails, paymentMethod } = req.body;
      
      // Get booking details
      const booking = await storage.getBooking(bookingId);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }

      // Get travel package details
      const travelPackage = await storage.getTravelPackage(booking.packageId);
      if (!travelPackage) {
        return res.status(404).json({ message: "Travel package not found" });
      }

      // Check for environment variables
      if (!process.env.MIDTRANS_SERVER_KEY || !process.env.MIDTRANS_CLIENT_KEY) {
        return res.status(500).json({ 
          message: "Payment service configuration missing",
          error: "Midtrans API keys not configured"
        });
      }

      // Create Midtrans service
      const midtransService = createMidtransService();
      const orderId = generateOrderId();

      // Create payment record first
      const paymentResult = insertPaymentSchema.safeParse({
        bookingId,
        orderId,
        amount: booking.totalAmount,
        paymentMethod: paymentMethod || 'qris',
        status: 'pending'
      });

      if (!paymentResult.success) {
        return res.status(400).json({ message: "Invalid payment data", errors: paymentResult.error.errors });
      }

      const payment = await storage.createPayment(paymentResult.data);

      // Create Midtrans transaction
      const paymentRequest = {
        orderId,
        amount: parseInt(booking.totalAmount),
        customerDetails: {
          first_name: customerDetails?.firstName || booking.customerName.split(' ')[0],
          last_name: customerDetails?.lastName || booking.customerName.split(' ').slice(1).join(' '),
          email: customerDetails?.email || booking.customerEmail,
          phone: customerDetails?.phone || booking.customerPhone
        },
        itemDetails: [{
          id: travelPackage.id,
          price: parseInt(booking.totalAmount),
          quantity: 1,
          name: `${travelPackage.name} - ${booking.numberOfPeople} orang`
        }],
        paymentMethod
      };

      const transactionResponse = await midtransService.createTransaction(paymentRequest);

      res.json({
        payment,
        transaction: transactionResponse
      });

    } catch (error: any) {
      console.error("Error creating payment:", error);
      res.status(500).json({ 
        message: "Failed to create payment", 
        error: error?.message || 'Unknown error'
      });
    }
  });

  app.get("/api/payments/:id", async (req, res) => {
    try {
      const payment = await storage.getPayment(req.params.id);
      if (!payment) {
        return res.status(404).json({ message: "Payment not found" });
      }
      res.json(payment);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch payment" });
    }
  });

  // Midtrans webhook handler
  app.post("/api/payments/webhook", async (req, res) => {
    try {
      const notification = req.body;
      console.log('Received Midtrans webhook:', notification);

      // Check for environment variables
      if (!process.env.MIDTRANS_SERVER_KEY || !process.env.MIDTRANS_CLIENT_KEY) {
        return res.status(500).json({ message: "Payment service not configured" });
      }

      // Verify webhook signature
      const midtransService = createMidtransService();
      const isValid = midtransService.verifyNotification(notification);
      
      if (!isValid) {
        console.error('Invalid webhook signature');
        return res.status(400).json({ message: "Invalid signature" });
      }

      // Get payment by order ID
      const payment = await storage.getPaymentByOrderId(notification.order_id);
      if (!payment) {
        console.error('Payment not found for order:', notification.order_id);
        return res.status(404).json({ message: "Payment not found" });
      }

      // Update payment status based on notification
      let newStatus = 'pending';
      switch (notification.transaction_status) {
        case 'capture':
        case 'settlement':
          newStatus = 'completed';
          break;
        case 'pending':
          newStatus = 'pending';
          break;
        case 'deny':
        case 'cancel':
        case 'expire':
          newStatus = 'failed';
          break;
        case 'failure':
          newStatus = 'failed';
          break;
      }

      // Update payment with transaction data
      const transactionData = midtransService.formatTransactionResponse(notification);
      await storage.updatePaymentStatus(payment.id, newStatus, transactionData);

      // Update booking status if payment is completed
      if (newStatus === 'completed') {
        await storage.updateBookingStatus(payment.bookingId, 'confirmed');
      } else if (newStatus === 'failed') {
        await storage.updateBookingStatus(payment.bookingId, 'cancelled');
      }

      res.json({ message: "Webhook processed successfully" });

    } catch (error: any) {
      console.error("Error processing webhook:", error);
      res.status(500).json({ 
        message: "Failed to process webhook", 
        error: error?.message || 'Unknown error'
      });
    }
  });

  // Environment variables endpoint
  app.get("/api/config", async (req, res) => {
    try {
      res.json({
        mapboxToken: process.env.MAPBOX_PUBLIC_KEY || ''
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to get config" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
