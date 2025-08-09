import { type User, type InsertUser, type TravelPackage, type InsertTravelPackage, type Inquiry, type InsertInquiry, type Booking, type InsertBooking, type Payment, type InsertPayment } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getTravelPackages(): Promise<TravelPackage[]>;
  getTravelPackage(id: string): Promise<TravelPackage | undefined>;
  createTravelPackage(pkg: InsertTravelPackage): Promise<TravelPackage>;
  
  getInquiries(): Promise<Inquiry[]>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  
  // Booking operations
  getBookings(): Promise<Booking[]>;
  getBooking(id: string): Promise<Booking | undefined>;
  getBookingsByUser(userId: string): Promise<Booking[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBookingStatus(id: string, status: string): Promise<Booking | undefined>;
  
  // Payment operations
  getPayments(): Promise<Payment[]>;
  getPayment(id: string): Promise<Payment | undefined>;
  getPaymentByOrderId(orderId: string): Promise<Payment | undefined>;
  createPayment(payment: InsertPayment): Promise<Payment>;
  updatePaymentStatus(id: string, status: string, transactionData?: any): Promise<Payment | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private travelPackages: Map<string, TravelPackage>;
  private inquiries: Map<string, Inquiry>;
  private bookings: Map<string, Booking>;
  private payments: Map<string, Payment>;

  constructor() {
    this.users = new Map();
    this.travelPackages = new Map();
    this.inquiries = new Map();
    this.bookings = new Map();
    this.payments = new Map();
    
    // Initialize with sample travel packages
    this.initializeSampleData();
  }

  private initializeSampleData() {
    const samplePackages: InsertTravelPackage[] = [
      {
        name: "Bali Budaya & Alam",
        description: "Jelajahi keindahan sawah terasering Jatiluwih, Pura Tanah Lot, dan budaya Bali yang autentik",
        duration: "3D2N",
        price: 2850000,
        rating: 5,
        imageUrl: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        location: "Bali"
      },
      {
        name: "Yogya Heritage Tour",
        description: "Eksplorasi Candi Borobudur, Prambanan, Keraton Yogya, dan kuliner legendaris Gudeg",
        duration: "4D3N",
        price: 1950000,
        rating: 5,
        imageUrl: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        location: "Yogyakarta"
      },
      {
        name: "Lombok Paradise",
        description: "Nikmati keindahan Pantai Senggigi, Gili Trawangan, dan pendakian Gunung Rinjani",
        duration: "5D4N",
        price: 3450000,
        rating: 4,
        imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        location: "Lombok"
      }
    ];

    samplePackages.forEach(pkg => {
      this.createTravelPackage(pkg);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getTravelPackages(): Promise<TravelPackage[]> {
    return Array.from(this.travelPackages.values());
  }

  async getTravelPackage(id: string): Promise<TravelPackage | undefined> {
    return this.travelPackages.get(id);
  }

  async createTravelPackage(insertPackage: InsertTravelPackage): Promise<TravelPackage> {
    const id = randomUUID();
    const pkg: TravelPackage = { 
      ...insertPackage, 
      id,
      rating: insertPackage.rating || 5,
      createdAt: new Date()
    };
    this.travelPackages.set(id, pkg);
    return pkg;
  }

  async getInquiries(): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values());
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const id = randomUUID();
    const inquiry: Inquiry = { 
      ...insertInquiry, 
      id,
      destination: insertInquiry.destination || null,
      createdAt: new Date()
    };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }

  // Booking operations
  async getBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async getBookingsByUser(userId: string): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(
      booking => booking.userId === userId
    );
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = randomUUID();
    const booking: Booking = {
      ...insertBooking,
      id,
      status: insertBooking.status || 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async updateBookingStatus(id: string, status: string): Promise<Booking | undefined> {
    const booking = this.bookings.get(id);
    if (booking) {
      booking.status = status;
      booking.updatedAt = new Date();
      this.bookings.set(id, booking);
    }
    return booking;
  }

  // Payment operations
  async getPayments(): Promise<Payment[]> {
    return Array.from(this.payments.values());
  }

  async getPayment(id: string): Promise<Payment | undefined> {
    return this.payments.get(id);
  }

  async getPaymentByOrderId(orderId: string): Promise<Payment | undefined> {
    return Array.from(this.payments.values()).find(
      payment => payment.orderId === orderId
    );
  }

  async createPayment(insertPayment: InsertPayment): Promise<Payment> {
    const id = randomUUID();
    const payment: Payment = {
      ...insertPayment,
      id,
      status: insertPayment.status || 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.payments.set(id, payment);
    return payment;
  }

  async updatePaymentStatus(id: string, status: string, transactionData?: any): Promise<Payment | undefined> {
    const payment = this.payments.get(id);
    if (payment) {
      payment.status = status;
      payment.updatedAt = new Date();
      if (transactionData) {
        payment.transactionId = transactionData.transaction_id;
        payment.paymentType = transactionData.payment_type;
        payment.fraudStatus = transactionData.fraud_status;
        if (transactionData.settlement_time) {
          payment.paidAt = new Date(transactionData.settlement_time);
        }
      }
      this.payments.set(id, payment);
    }
    return payment;
  }
}

export const storage = new MemStorage();
