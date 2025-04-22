import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the request body
      const validatedData = insertContactSchema.parse(req.body);
      
      // Store in memory
      const contact = await storage.createContact(validatedData);
      
      // Send response
      res.status(201).json({ 
        success: true, 
        message: "Contact submission received",
        id: contact.id
      });
    } catch (error) {
      console.error("Error processing contact form:", error);
      res.status(400).json({ 
        success: false, 
        message: "Invalid form submission"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
