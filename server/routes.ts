import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertContactSchema,
  insertCategorySchema,
  insertProjectSchema,
  insertProposalSchema,
  insertContractSchema,
  insertReviewSchema,
  insertMessageSchema,
  insertSkillSchema,
  insertPaymentSchema,
  UserRole
} from "@shared/schema";
import { z } from "zod";
import { setupAuth, isAuthenticated } from "./replitAuth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up Replit Auth
  await setupAuth(app);
  
  // Auth route for getting the current user
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });
  
  // =====================
  // ORIGINAL ROUTES
  // =====================
  
  // Register new user
  app.post("/api/auth/register", async (req, res) => {
    try {
      // Check if username or email already exists
      const existingUser = await storage.getUserByUsername(req.body.username);
      if (existingUser) {
        return res.status(400).json({ 
          success: false, 
          message: "Username already exists" 
        });
      }
      
      const existingEmail = await storage.getUserByEmail(req.body.email);
      if (existingEmail) {
        return res.status(400).json({ 
          success: false, 
          message: "Email already exists" 
        });
      }
      
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      
      // Validate data
      const validatedData = insertUserSchema.parse({
        ...req.body,
        password: hashedPassword
      });
      
      // Create user
      const user = await storage.createUser(validatedData);
      
      // Create token
      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role }, 
        process.env.JWT_SECRET || 'secretkey',
        { expiresIn: '24h' }
      );
      
      // Return user without password
      const { password, ...userWithoutPassword } = user;
      
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: userWithoutPassword,
        token
      });
    } catch (error) {
      console.error("Error registering user:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid user data",
          errors: error.errors
        });
      }
      res.status(500).json({ 
        success: false, 
        message: "Failed to register user" 
      });
    }
  });
  
  // Login
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      // Find user
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ 
          success: false, 
          message: "Invalid username or password" 
        });
      }
      
      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ 
          success: false, 
          message: "Invalid username or password" 
        });
      }
      
      // Create token
      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role }, 
        process.env.JWT_SECRET || 'secretkey',
        { expiresIn: '24h' }
      );
      
      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
      
      res.status(200).json({
        success: true,
        message: "Login successful",
        user: userWithoutPassword,
        token
      });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to log in" 
      });
    }
  });
  
  // Get current user
  app.get("/api/auth/me", authenticateToken, async (req, res) => {
    try {
      const userId = (req as any).user.id;
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ 
          success: false, 
          message: "User not found" 
        });
      }
      
      // Return user without password
      const { password, ...userWithoutPassword } = user;
      
      res.status(200).json({
        success: true,
        user: userWithoutPassword
      });
    } catch (error) {
      console.error("Error fetching current user:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch user data" 
      });
    }
  });
  
  // =====================
  // USER ROUTES
  // =====================
  
  // Get user profile
  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(parseInt(req.params.id));
      
      if (!user) {
        return res.status(404).json({ 
          success: false, 
          message: "User not found" 
        });
      }
      
      // Return user without password
      const { password, ...userWithoutPassword } = user;
      
      res.status(200).json({
        success: true,
        user: userWithoutPassword
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch user data" 
      });
    }
  });
  
  // Update user profile
  app.put("/api/users/:id", authenticateToken, async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const currentUser = (req as any).user;
      
      // Check if the user is updating their own profile
      if (currentUser.id !== userId) {
        return res.status(403).json({ 
          success: false, 
          message: "You can only update your own profile" 
        });
      }
      
      // Exclude password from update data
      const { password, ...updateData } = req.body;
      
      const updatedUser = await storage.updateUser(userId, updateData);
      
      if (!updatedUser) {
        return res.status(404).json({ 
          success: false, 
          message: "User not found" 
        });
      }
      
      // Return user without password
      const { password: _, ...userWithoutPassword } = updatedUser;
      
      res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user: userWithoutPassword
      });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to update user data" 
      });
    }
  });
  
  // Search users (e.g., freelancers)
  app.get("/api/users", async (req, res) => {
    try {
      const query = (req.query.q as string) || '';
      const role = (req.query.role as string) || '';
      
      const users = await storage.searchUsers(query, role);
      
      // Remove passwords from results
      const safeUsers = users.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
      
      res.status(200).json({
        success: true,
        users: safeUsers
      });
    } catch (error) {
      console.error("Error searching users:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to search users" 
      });
    }
  });
  
  // =====================
  // CATEGORY ROUTES
  // =====================
  
  // Get all categories
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.status(200).json({
        success: true,
        categories
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch categories" 
      });
    }
  });
  
  // Get category by ID
  app.get("/api/categories/:id", async (req, res) => {
    try {
      const category = await storage.getCategory(parseInt(req.params.id));
      
      if (!category) {
        return res.status(404).json({ 
          success: false, 
          message: "Category not found" 
        });
      }
      
      res.status(200).json({
        success: true,
        category
      });
    } catch (error) {
      console.error("Error fetching category:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch category" 
      });
    }
  });
  
  // Create category (admin only)
  app.post("/api/categories", authenticateToken, async (req, res) => {
    try {
      const currentUser = (req as any).user;
      
      // Check if the user is an admin
      if (currentUser.role !== UserRole.ADMIN) {
        return res.status(403).json({ 
          success: false, 
          message: "Only admins can create categories" 
        });
      }
      
      const validatedData = insertCategorySchema.parse(req.body);
      const category = await storage.createCategory(validatedData);
      
      res.status(201).json({
        success: true,
        message: "Category created successfully",
        category
      });
    } catch (error) {
      console.error("Error creating category:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid category data",
          errors: error.errors
        });
      }
      res.status(500).json({ 
        success: false, 
        message: "Failed to create category" 
      });
    }
  });
  
  // =====================
  // PROJECT ROUTES
  // =====================
  
  // Get all projects with pagination
  app.get("/api/projects", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 20;
      const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
      
      const projects = await storage.getProjects(limit, offset);
      
      res.status(200).json({
        success: true,
        projects
      });
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch projects" 
      });
    }
  });
  
  // Get project by ID
  app.get("/api/projects/:id", async (req, res) => {
    try {
      const project = await storage.getProject(parseInt(req.params.id));
      
      if (!project) {
        return res.status(404).json({ 
          success: false, 
          message: "Project not found" 
        });
      }
      
      res.status(200).json({
        success: true,
        project
      });
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch project" 
      });
    }
  });
  
  // Get projects by client
  app.get("/api/users/:id/projects", async (req, res) => {
    try {
      const clientId = parseInt(req.params.id);
      const projects = await storage.getProjectsByClient(clientId);
      
      res.status(200).json({
        success: true,
        projects
      });
    } catch (error) {
      console.error("Error fetching client projects:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch client projects" 
      });
    }
  });
  
  // Search projects
  app.get("/api/projects/search", async (req, res) => {
    try {
      const query = (req.query.q as string) || '';
      const categoryId = req.query.category ? parseInt(req.query.category as string) : undefined;
      const minBudget = req.query.minBudget ? parseFloat(req.query.minBudget as string) : undefined;
      const maxBudget = req.query.maxBudget ? parseFloat(req.query.maxBudget as string) : undefined;
      const status = req.query.status as string;
      
      const projects = await storage.searchProjects(
        query, 
        categoryId,
        minBudget,
        maxBudget,
        status
      );
      
      res.status(200).json({
        success: true,
        projects
      });
    } catch (error) {
      console.error("Error searching projects:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to search projects" 
      });
    }
  });
  
  // Create project
  app.post("/api/projects", authenticateToken, async (req, res) => {
    try {
      const currentUser = (req as any).user;
      
      // Check if the user is a client
      if (currentUser.role !== UserRole.CLIENT && currentUser.role !== UserRole.ADMIN) {
        return res.status(403).json({ 
          success: false, 
          message: "Only clients can post projects" 
        });
      }
      
      // Add client ID to project data
      const projectData = {
        ...req.body,
        clientId: currentUser.id
      };
      
      const validatedData = insertProjectSchema.parse(projectData);
      const project = await storage.createProject(validatedData);
      
      res.status(201).json({
        success: true,
        message: "Project created successfully",
        project
      });
    } catch (error) {
      console.error("Error creating project:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid project data",
          errors: error.errors
        });
      }
      res.status(500).json({ 
        success: false, 
        message: "Failed to create project" 
      });
    }
  });
  
  // Update project
  app.put("/api/projects/:id", authenticateToken, async (req, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const currentUser = (req as any).user;
      
      // Get the project to check ownership
      const project = await storage.getProject(projectId);
      
      if (!project) {
        return res.status(404).json({ 
          success: false, 
          message: "Project not found" 
        });
      }
      
      // Check if the user is the project owner or an admin
      if (project.clientId !== currentUser.id && currentUser.role !== UserRole.ADMIN) {
        return res.status(403).json({ 
          success: false, 
          message: "You can only update your own projects" 
        });
      }
      
      const updatedProject = await storage.updateProject(projectId, req.body);
      
      res.status(200).json({
        success: true,
        message: "Project updated successfully",
        project: updatedProject
      });
    } catch (error) {
      console.error("Error updating project:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to update project" 
      });
    }
  });
  
  // Delete project
  app.delete("/api/projects/:id", authenticateToken, async (req, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const currentUser = (req as any).user;
      
      // Get the project to check ownership
      const project = await storage.getProject(projectId);
      
      if (!project) {
        return res.status(404).json({ 
          success: false, 
          message: "Project not found" 
        });
      }
      
      // Check if the user is the project owner or an admin
      if (project.clientId !== currentUser.id && currentUser.role !== UserRole.ADMIN) {
        return res.status(403).json({ 
          success: false, 
          message: "You can only delete your own projects" 
        });
      }
      
      await storage.deleteProject(projectId);
      
      res.status(200).json({
        success: true,
        message: "Project deleted successfully"
      });
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to delete project" 
      });
    }
  });
  
  // =====================
  // PROPOSAL ROUTES
  // =====================
  
  // Get proposals for a project
  app.get("/api/projects/:id/proposals", authenticateToken, async (req, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const currentUser = (req as any).user;
      
      // Get the project to check ownership
      const project = await storage.getProject(projectId);
      
      if (!project) {
        return res.status(404).json({ 
          success: false, 
          message: "Project not found" 
        });
      }
      
      // Check if the user is the project owner or an admin
      if (project.clientId !== currentUser.id && currentUser.role !== UserRole.ADMIN) {
        return res.status(403).json({ 
          success: false, 
          message: "Only the project owner can view proposals" 
        });
      }
      
      const proposals = await storage.getProposals(projectId);
      
      res.status(200).json({
        success: true,
        proposals
      });
    } catch (error) {
      console.error("Error fetching proposals:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch proposals" 
      });
    }
  });
  
  // Get freelancer's proposals
  app.get("/api/my-proposals", authenticateToken, async (req, res) => {
    try {
      const currentUser = (req as any).user;
      
      // Check if the user is a freelancer
      if (currentUser.role !== UserRole.FREELANCER && currentUser.role !== UserRole.ADMIN) {
        return res.status(403).json({ 
          success: false, 
          message: "Only freelancers can view their proposals" 
        });
      }
      
      const proposals = await storage.getProposalsByFreelancer(currentUser.id);
      
      res.status(200).json({
        success: true,
        proposals
      });
    } catch (error) {
      console.error("Error fetching freelancer proposals:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch proposals" 
      });
    }
  });
  
  // Submit a proposal
  app.post("/api/projects/:id/proposals", authenticateToken, async (req, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const currentUser = (req as any).user;
      
      // Check if the user is a freelancer
      if (currentUser.role !== UserRole.FREELANCER) {
        return res.status(403).json({ 
          success: false, 
          message: "Only freelancers can submit proposals" 
        });
      }
      
      // Check if project exists
      const project = await storage.getProject(projectId);
      if (!project) {
        return res.status(404).json({ 
          success: false, 
          message: "Project not found" 
        });
      }
      
      // Check if project is open
      if (project.status !== "open") {
        return res.status(400).json({ 
          success: false, 
          message: "This project is not accepting proposals" 
        });
      }
      
      // Add freelancer ID and project ID to proposal data
      const proposalData = {
        ...req.body,
        freelancerId: currentUser.id,
        projectId
      };
      
      const validatedData = insertProposalSchema.parse(proposalData);
      const proposal = await storage.createProposal(validatedData);
      
      res.status(201).json({
        success: true,
        message: "Proposal submitted successfully",
        proposal
      });
    } catch (error) {
      console.error("Error submitting proposal:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid proposal data",
          errors: error.errors
        });
      }
      res.status(500).json({ 
        success: false, 
        message: "Failed to submit proposal" 
      });
    }
  });
  
  // =====================
  // CONTRACT ROUTES
  // =====================
  
  // Get user's contracts
  app.get("/api/contracts", authenticateToken, async (req, res) => {
    try {
      const currentUser = (req as any).user;
      const role = currentUser.role === UserRole.CLIENT ? 'client' : 'freelancer';
      
      const contracts = await storage.getContracts(currentUser.id, role);
      
      res.status(200).json({
        success: true,
        contracts
      });
    } catch (error) {
      console.error("Error fetching contracts:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch contracts" 
      });
    }
  });
  
  // Get contract by ID
  app.get("/api/contracts/:id", authenticateToken, async (req, res) => {
    try {
      const contractId = parseInt(req.params.id);
      const currentUser = (req as any).user;
      
      const contract = await storage.getContract(contractId);
      
      if (!contract) {
        return res.status(404).json({ 
          success: false, 
          message: "Contract not found" 
        });
      }
      
      // Check if the user is part of the contract or an admin
      if (contract.clientId !== currentUser.id && 
          contract.freelancerId !== currentUser.id && 
          currentUser.role !== UserRole.ADMIN) {
        return res.status(403).json({ 
          success: false, 
          message: "You don't have access to this contract" 
        });
      }
      
      res.status(200).json({
        success: true,
        contract
      });
    } catch (error) {
      console.error("Error fetching contract:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch contract" 
      });
    }
  });
  
  // Create a contract (from a proposal)
  app.post("/api/contracts", authenticateToken, async (req, res) => {
    try {
      const currentUser = (req as any).user;
      
      // Check if the user is a client
      if (currentUser.role !== UserRole.CLIENT && currentUser.role !== UserRole.ADMIN) {
        return res.status(403).json({ 
          success: false, 
          message: "Only clients can create contracts" 
        });
      }
      
      // If proposal ID is provided, validate it
      if (req.body.proposalId) {
        const proposal = await storage.getProposal(req.body.proposalId);
        
        if (!proposal) {
          return res.status(404).json({ 
            success: false, 
            message: "Proposal not found" 
          });
        }
        
        // Check if the user is the project owner
        const project = await storage.getProject(proposal.projectId);
        
        if (!project || project.clientId !== currentUser.id) {
          return res.status(403).json({ 
            success: false, 
            message: "You can only create contracts for your own projects" 
          });
        }
        
        // Add additional data from proposal
        req.body.projectId = proposal.projectId;
        req.body.freelancerId = proposal.freelancerId;
        req.body.clientId = currentUser.id;
      }
      
      const validatedData = insertContractSchema.parse(req.body);
      const contract = await storage.createContract(validatedData);
      
      // If contract was created, update the project status
      if (contract && contract.projectId) {
        await storage.updateProject(contract.projectId, { status: "in_progress" });
      }
      
      res.status(201).json({
        success: true,
        message: "Contract created successfully",
        contract
      });
    } catch (error) {
      console.error("Error creating contract:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid contract data",
          errors: error.errors
        });
      }
      res.status(500).json({ 
        success: false, 
        message: "Failed to create contract" 
      });
    }
  });
  
  // Update contract status
  app.put("/api/contracts/:id", authenticateToken, async (req, res) => {
    try {
      const contractId = parseInt(req.params.id);
      const currentUser = (req as any).user;
      
      const contract = await storage.getContract(contractId);
      
      if (!contract) {
        return res.status(404).json({ 
          success: false, 
          message: "Contract not found" 
        });
      }
      
      // Check if the user is part of the contract or an admin
      if (contract.clientId !== currentUser.id && 
          contract.freelancerId !== currentUser.id && 
          currentUser.role !== UserRole.ADMIN) {
        return res.status(403).json({ 
          success: false, 
          message: "You don't have access to this contract" 
        });
      }
      
      // Only allow status updates
      const updatedContract = await storage.updateContract(contractId, { 
        status: req.body.status
      });
      
      // If contract is marked as completed, update the project status
      if (req.body.status === "completed" && contract.projectId) {
        await storage.updateProject(contract.projectId, { status: "completed" });
      }
      
      res.status(200).json({
        success: true,
        message: "Contract updated successfully",
        contract: updatedContract
      });
    } catch (error) {
      console.error("Error updating contract:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to update contract" 
      });
    }
  });
  
  // =====================
  // REVIEW ROUTES
  // =====================
  
  // Get reviews for a user
  app.get("/api/users/:id/reviews", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const reviews = await storage.getReviews(userId);
      
      res.status(200).json({
        success: true,
        reviews
      });
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch reviews" 
      });
    }
  });
  
  // Submit a review
  app.post("/api/contracts/:id/reviews", authenticateToken, async (req, res) => {
    try {
      const contractId = parseInt(req.params.id);
      const currentUser = (req as any).user;
      
      const contract = await storage.getContract(contractId);
      
      if (!contract) {
        return res.status(404).json({ 
          success: false, 
          message: "Contract not found" 
        });
      }
      
      // Check if the user is part of the contract
      if (contract.clientId !== currentUser.id && contract.freelancerId !== currentUser.id) {
        return res.status(403).json({ 
          success: false, 
          message: "You can only review contracts you're part of" 
        });
      }
      
      // Check if the contract is completed
      if (contract.status !== "completed") {
        return res.status(400).json({ 
          success: false, 
          message: "You can only review completed contracts" 
        });
      }
      
      // Determine reviewer and reviewee
      const isClientReviewing = contract.clientId === currentUser.id;
      const reviewerId = currentUser.id;
      const revieweeId = isClientReviewing ? contract.freelancerId : contract.clientId;
      
      // Add additional data to review
      const reviewData = {
        ...req.body,
        contractId,
        reviewerId,
        revieweeId
      };
      
      const validatedData = insertReviewSchema.parse(reviewData);
      const review = await storage.createReview(validatedData);
      
      res.status(201).json({
        success: true,
        message: "Review submitted successfully",
        review
      });
    } catch (error) {
      console.error("Error submitting review:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid review data",
          errors: error.errors
        });
      }
      res.status(500).json({ 
        success: false, 
        message: "Failed to submit review" 
      });
    }
  });
  
  // =====================
  // MESSAGE ROUTES
  // =====================
  
  // Get conversation between two users
  app.get("/api/messages/:userId", authenticateToken, async (req, res) => {
    try {
      const currentUser = (req as any).user;
      const otherUserId = parseInt(req.params.userId);
      const projectId = req.query.projectId ? parseInt(req.query.projectId as string) : undefined;
      
      const messages = await storage.getMessages(currentUser.id, otherUserId, projectId);
      
      res.status(200).json({
        success: true,
        messages
      });
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch messages" 
      });
    }
  });
  
  // Send a message
  app.post("/api/messages", authenticateToken, async (req, res) => {
    try {
      const currentUser = (req as any).user;
      
      // Add sender ID to message data
      const messageData = {
        ...req.body,
        senderId: currentUser.id
      };
      
      const validatedData = insertMessageSchema.parse(messageData);
      const message = await storage.createMessage(validatedData);
      
      res.status(201).json({
        success: true,
        message: "Message sent successfully",
        data: message
      });
    } catch (error) {
      console.error("Error sending message:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid message data",
          errors: error.errors
        });
      }
      res.status(500).json({ 
        success: false, 
        message: "Failed to send message" 
      });
    }
  });
  
  // Mark message as read
  app.put("/api/messages/:id/read", authenticateToken, async (req, res) => {
    try {
      const messageId = parseInt(req.params.id);
      
      await storage.markMessageAsRead(messageId);
      
      res.status(200).json({
        success: true,
        message: "Message marked as read"
      });
    } catch (error) {
      console.error("Error marking message as read:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to mark message as read" 
      });
    }
  });
  
  // Get unread messages count
  app.get("/api/messages/unread/count", authenticateToken, async (req, res) => {
    try {
      const currentUser = (req as any).user;
      
      const count = await storage.getUnreadMessagesCount(currentUser.id);
      
      res.status(200).json({
        success: true,
        count
      });
    } catch (error) {
      console.error("Error fetching unread messages count:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch unread messages count" 
      });
    }
  });
  
  // =====================
  // SKILL ROUTES
  // =====================
  
  // Get all skills
  app.get("/api/skills", async (req, res) => {
    try {
      const categoryId = req.query.categoryId ? parseInt(req.query.categoryId as string) : undefined;
      const skills = await storage.getSkills(categoryId);
      
      res.status(200).json({
        success: true,
        skills
      });
    } catch (error) {
      console.error("Error fetching skills:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch skills" 
      });
    }
  });
  
  // =====================
  // PAYMENT ROUTES
  // =====================
  
  // Get payments for a contract
  app.get("/api/contracts/:id/payments", authenticateToken, async (req, res) => {
    try {
      const contractId = parseInt(req.params.id);
      const currentUser = (req as any).user;
      
      const contract = await storage.getContract(contractId);
      
      if (!contract) {
        return res.status(404).json({ 
          success: false, 
          message: "Contract not found" 
        });
      }
      
      // Check if the user is part of the contract or an admin
      if (contract.clientId !== currentUser.id && 
          contract.freelancerId !== currentUser.id && 
          currentUser.role !== UserRole.ADMIN) {
        return res.status(403).json({ 
          success: false, 
          message: "You don't have access to this contract's payments" 
        });
      }
      
      const payments = await storage.getPayments(contractId);
      
      res.status(200).json({
        success: true,
        payments
      });
    } catch (error) {
      console.error("Error fetching payments:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch payments" 
      });
    }
  });
  
  // Create a payment
  app.post("/api/payments", authenticateToken, async (req, res) => {
    try {
      const currentUser = (req as any).user;
      
      // Get the contract to check ownership
      const contract = await storage.getContract(req.body.contractId);
      
      if (!contract) {
        return res.status(404).json({ 
          success: false, 
          message: "Contract not found" 
        });
      }
      
      // Check if the user is the client or an admin
      if (contract.clientId !== currentUser.id && currentUser.role !== UserRole.ADMIN) {
        return res.status(403).json({ 
          success: false, 
          message: "Only the client can make payments" 
        });
      }
      
      const validatedData = insertPaymentSchema.parse(req.body);
      const payment = await storage.createPayment(validatedData);
      
      res.status(201).json({
        success: true,
        message: "Payment created successfully",
        payment
      });
    } catch (error) {
      console.error("Error creating payment:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid payment data",
          errors: error.errors
        });
      }
      res.status(500).json({ 
        success: false, 
        message: "Failed to create payment" 
      });
    }
  });
  
  // Update payment status
  app.put("/api/payments/:id", authenticateToken, async (req, res) => {
    try {
      const paymentId = parseInt(req.params.id);
      const currentUser = (req as any).user;
      
      // Only admins can update payment statuses
      if (currentUser.role !== UserRole.ADMIN) {
        return res.status(403).json({ 
          success: false, 
          message: "Only admins can update payment statuses" 
        });
      }
      
      const updatedPayment = await storage.updatePayment(paymentId, { 
        status: req.body.status
      });
      
      if (!updatedPayment) {
        return res.status(404).json({ 
          success: false, 
          message: "Payment not found" 
        });
      }
      
      res.status(200).json({
        success: true,
        message: "Payment updated successfully",
        payment: updatedPayment
      });
    } catch (error) {
      console.error("Error updating payment:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to update payment" 
      });
    }
  });
  
  // =====================
  // CONTACT ROUTES
  // =====================
  
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
