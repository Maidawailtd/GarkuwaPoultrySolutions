import { 
  users, 
  type User, 
  type InsertUser, 
  contactSubmissions, 
  type ContactSubmission, 
  type InsertContact,
  categories,
  type Category,
  type InsertCategory,
  projects,
  type Project,
  type InsertProject,
  proposals,
  type Proposal,
  type InsertProposal,
  contracts,
  type Contract,
  type InsertContract,
  reviews,
  type Review,
  type InsertReview,
  messages,
  type Message,
  type InsertMessage,
  skills,
  type Skill,
  type InsertSkill,
  payments,
  type Payment,
  type InsertPayment
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, asc, sql, isNull, gt, lt, gte, lte, like, or } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, user: Partial<InsertUser>): Promise<User | undefined>;
  upsertUser(user: any): Promise<User>;
  searchUsers(query: string, role?: string): Promise<User[]>;

  // Category operations
  getCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategory(id: number, category: Partial<InsertCategory>): Promise<Category | undefined>;
  deleteCategory(id: number): Promise<boolean>;

  // Project operations
  getProjects(limit?: number, offset?: number): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  getProjectsByClient(clientId: string): Promise<Project[]>;
  getProjectsByCategory(categoryId: number): Promise<Project[]>;
  searchProjects(query: string, categoryId?: number, minBudget?: number, maxBudget?: number, status?: string): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;

  // Proposal operations
  getProposals(projectId: number): Promise<Proposal[]>;
  getProposal(id: number): Promise<Proposal | undefined>;
  getProposalsByFreelancer(freelancerId: string): Promise<Proposal[]>;
  createProposal(proposal: InsertProposal): Promise<Proposal>;
  updateProposal(id: number, proposal: Partial<InsertProposal>): Promise<Proposal | undefined>;
  deleteProposal(id: number): Promise<boolean>;

  // Contract operations
  getContracts(userId: string, role: 'client' | 'freelancer'): Promise<Contract[]>;
  getContract(id: number): Promise<Contract | undefined>;
  createContract(contract: InsertContract): Promise<Contract>;
  updateContract(id: number, contract: Partial<InsertContract>): Promise<Contract | undefined>;

  // Review operations
  getReviews(userId: string): Promise<Review[]>;
  getReview(id: number): Promise<Review | undefined>;
  createReview(review: InsertReview): Promise<Review>;

  // Message operations
  getMessages(userId1: string, userId2: string, projectId?: number): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  markMessageAsRead(id: number): Promise<boolean>;
  getUnreadMessagesCount(userId: string): Promise<number>;

  // Skill operations
  getSkills(categoryId?: number): Promise<Skill[]>;
  createSkill(skill: InsertSkill): Promise<Skill>;

  // Payment operations
  getPayments(contractId: number): Promise<Payment[]>;
  createPayment(payment: InsertPayment): Promise<Payment>;
  updatePayment(id: number, payment: Partial<InsertPayment>): Promise<Payment | undefined>;

  // Contact submissions
  createContactSubmission(contact: InsertContact): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    if (!email) return undefined;
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUser(id: string, userData: Partial<InsertUser>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({
        ...userData,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
      .returning();
    return user;
  }
  
  async upsertUser(userData: any): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({
        ...userData,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async searchUsers(query: string, role?: string): Promise<User[]> {
    let conditions = or(
      like(users.firstName, `%${query}%`),
      like(users.lastName, `%${query}%`),
      like(users.email, `%${query}%`),
      like(users.bio, `%${query}%`)
    );
    
    if (role) {
      conditions = and(conditions, eq(users.role, role));
    }

    return db
      .select()
      .from(users)
      .where(conditions)
      .orderBy(desc(users.createdAt));
  }

  // Category operations
  async getCategories(): Promise<Category[]> {
    return db.select().from(categories).orderBy(categories.name);
  }

  async getCategory(id: number): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.id, id));
    return category;
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const [newCategory] = await db
      .insert(categories)
      .values(category)
      .returning();
    return newCategory;
  }

  async updateCategory(id: number, categoryData: Partial<InsertCategory>): Promise<Category | undefined> {
    const [category] = await db
      .update(categories)
      .set(categoryData)
      .where(eq(categories.id, id))
      .returning();
    return category;
  }

  async deleteCategory(id: number): Promise<boolean> {
    const result = await db
      .delete(categories)
      .where(eq(categories.id, id));
    return true;
  }

  // Project operations
  async getProjects(limit = 20, offset = 0): Promise<Project[]> {
    return db
      .select()
      .from(projects)
      .limit(limit)
      .offset(offset)
      .orderBy(desc(projects.createdAt));
  }

  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }

  async getProjectsByClient(clientId: string): Promise<Project[]> {
    return db
      .select()
      .from(projects)
      .where(eq(projects.clientId, clientId))
      .orderBy(desc(projects.createdAt));
  }

  async getProjectsByCategory(categoryId: number): Promise<Project[]> {
    return db
      .select()
      .from(projects)
      .where(eq(projects.categoryId, categoryId))
      .orderBy(desc(projects.createdAt));
  }

  async searchProjects(
    query: string, 
    categoryId?: number, 
    minBudget?: number, 
    maxBudget?: number, 
    status?: string
  ): Promise<Project[]> {
    let queryBuilder = db
      .select()
      .from(projects)
      .where(
        or(
          like(projects.title, `%${query}%`),
          like(projects.description, `%${query}%`),
          like(projects.requirements, `%${query}%`)
        )
      );

    if (categoryId) {
      queryBuilder = queryBuilder.where(eq(projects.categoryId, categoryId));
    }

    if (minBudget) {
      queryBuilder = queryBuilder.where(gte(projects.budget, minBudget));
    }

    if (maxBudget) {
      queryBuilder = queryBuilder.where(lte(projects.budget, maxBudget));
    }

    if (status) {
      queryBuilder = queryBuilder.where(eq(projects.status, status));
    }

    return queryBuilder.orderBy(desc(projects.createdAt));
  }

  async createProject(project: InsertProject): Promise<Project> {
    const [newProject] = await db
      .insert(projects)
      .values(project)
      .returning();
    return newProject;
  }

  async updateProject(id: number, projectData: Partial<InsertProject>): Promise<Project | undefined> {
    const [project] = await db
      .update(projects)
      .set(projectData)
      .where(eq(projects.id, id))
      .returning();
    return project;
  }

  async deleteProject(id: number): Promise<boolean> {
    await db
      .delete(projects)
      .where(eq(projects.id, id));
    return true;
  }

  // Proposal operations
  async getProposals(projectId: number): Promise<Proposal[]> {
    return db
      .select()
      .from(proposals)
      .where(eq(proposals.projectId, projectId))
      .orderBy(asc(proposals.bidAmount));
  }

  async getProposal(id: number): Promise<Proposal | undefined> {
    const [proposal] = await db.select().from(proposals).where(eq(proposals.id, id));
    return proposal;
  }

  async getProposalsByFreelancer(freelancerId: string): Promise<Proposal[]> {
    return db
      .select()
      .from(proposals)
      .where(eq(proposals.freelancerId, freelancerId))
      .orderBy(desc(proposals.createdAt));
  }

  async createProposal(proposal: InsertProposal): Promise<Proposal> {
    const [newProposal] = await db
      .insert(proposals)
      .values(proposal)
      .returning();
    return newProposal;
  }

  async updateProposal(id: number, proposalData: Partial<InsertProposal>): Promise<Proposal | undefined> {
    const [proposal] = await db
      .update(proposals)
      .set(proposalData)
      .where(eq(proposals.id, id))
      .returning();
    return proposal;
  }

  async deleteProposal(id: number): Promise<boolean> {
    await db
      .delete(proposals)
      .where(eq(proposals.id, id));
    return true;
  }

  // Contract operations
  async getContracts(userId: number, role: 'client' | 'freelancer'): Promise<Contract[]> {
    return db
      .select()
      .from(contracts)
      .where(
        role === 'client' 
          ? eq(contracts.clientId, userId) 
          : eq(contracts.freelancerId, userId)
      )
      .orderBy(desc(contracts.createdAt));
  }

  async getContract(id: number): Promise<Contract | undefined> {
    const [contract] = await db.select().from(contracts).where(eq(contracts.id, id));
    return contract;
  }

  async createContract(contract: InsertContract): Promise<Contract> {
    const [newContract] = await db
      .insert(contracts)
      .values(contract)
      .returning();
    return newContract;
  }

  async updateContract(id: number, contractData: Partial<InsertContract>): Promise<Contract | undefined> {
    const [contract] = await db
      .update(contracts)
      .set(contractData)
      .where(eq(contracts.id, id))
      .returning();
    return contract;
  }

  // Review operations
  async getReviews(userId: number): Promise<Review[]> {
    return db
      .select()
      .from(reviews)
      .where(eq(reviews.revieweeId, userId))
      .orderBy(desc(reviews.createdAt));
  }

  async getReview(id: number): Promise<Review | undefined> {
    const [review] = await db.select().from(reviews).where(eq(reviews.id, id));
    return review;
  }

  async createReview(review: InsertReview): Promise<Review> {
    const [newReview] = await db
      .insert(reviews)
      .values(review)
      .returning();
    return newReview;
  }

  // Message operations
  async getMessages(userId1: number, userId2: number, projectId?: number): Promise<Message[]> {
    let queryBuilder = db
      .select()
      .from(messages)
      .where(
        or(
          and(
            eq(messages.senderId, userId1),
            eq(messages.receiverId, userId2)
          ),
          and(
            eq(messages.senderId, userId2),
            eq(messages.receiverId, userId1)
          )
        )
      );

    if (projectId) {
      queryBuilder = queryBuilder.where(eq(messages.projectId, projectId));
    }

    return queryBuilder.orderBy(asc(messages.createdAt));
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const [newMessage] = await db
      .insert(messages)
      .values(message)
      .returning();
    return newMessage;
  }

  async markMessageAsRead(id: number): Promise<boolean> {
    await db
      .update(messages)
      .set({ isRead: true })
      .where(eq(messages.id, id));
    return true;
  }

  async getUnreadMessagesCount(userId: number): Promise<number> {
    const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(messages)
      .where(
        and(
          eq(messages.receiverId, userId),
          eq(messages.isRead, false)
        )
      );
    return result[0]?.count || 0;
  }

  // Skill operations
  async getSkills(categoryId?: number): Promise<Skill[]> {
    let queryBuilder = db.select().from(skills);
    
    if (categoryId) {
      queryBuilder = queryBuilder.where(eq(skills.categoryId, categoryId));
    }

    return queryBuilder.orderBy(skills.name);
  }

  async createSkill(skill: InsertSkill): Promise<Skill> {
    const [newSkill] = await db
      .insert(skills)
      .values(skill)
      .returning();
    return newSkill;
  }

  // Payment operations
  async getPayments(contractId: number): Promise<Payment[]> {
    return db
      .select()
      .from(payments)
      .where(eq(payments.contractId, contractId))
      .orderBy(desc(payments.createdAt));
  }

  async createPayment(payment: InsertPayment): Promise<Payment> {
    const [newPayment] = await db
      .insert(payments)
      .values(payment)
      .returning();
    return newPayment;
  }

  async updatePayment(id: number, paymentData: Partial<InsertPayment>): Promise<Payment | undefined> {
    const [payment] = await db
      .update(payments)
      .set(paymentData)
      .where(eq(payments.id, id))
      .returning();
    return payment;
  }

  // Contact submissions
  async createContactSubmission(contact: InsertContact): Promise<ContactSubmission> {
    const [submission] = await db
      .insert(contactSubmissions)
      .values(contact)
      .returning();
    return submission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
  }
}

export const storage = new DatabaseStorage();
