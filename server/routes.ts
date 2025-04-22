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
      
      // Store in database
      const contact = await storage.createContactSubmission(validatedData);
      
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

  // Get all contact submissions
  app.get("/api/contacts", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.status(200).json(submissions);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch contact submissions"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
