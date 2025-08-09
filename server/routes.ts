import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertInquirySchema, insertTravelPackageSchema } from "@shared/schema";

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

  const httpServer = createServer(app);
  return httpServer;
}
