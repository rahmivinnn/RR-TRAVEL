import { type User, type InsertUser, type TravelPackage, type InsertTravelPackage, type Inquiry, type InsertInquiry } from "@shared/schema";
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
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private travelPackages: Map<string, TravelPackage>;
  private inquiries: Map<string, Inquiry>;

  constructor() {
    this.users = new Map();
    this.travelPackages = new Map();
    this.inquiries = new Map();
    
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
      createdAt: new Date()
    };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }
}

export const storage = new MemStorage();
