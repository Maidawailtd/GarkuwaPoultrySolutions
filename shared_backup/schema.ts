import { pgTable, text, serial, integer, boolean, timestamp, json, doublePrecision, varchar, jsonb, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User roles for the platform
export const UserRole = {
  FREELANCER: "freelancer",
  CLIENT: "client",
  ADMIN: "admin"
} as const;

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User table compatible with Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  role: text("role").notNull().default(UserRole.CLIENT),
  bio: text("bio"),
  skills: text("skills").array(),
  location: text("location"),
  hourlyRate: doublePrecision("hourly_rate"),
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description"),
  icon: text("icon"),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  budget: doublePrecision("budget"),
  deadline: timestamp("deadline"),
  clientId: integer("client_id").notNull().references(() => users.id),
  categoryId: integer("category_id").references(() => categories.id),
  status: text("status").notNull().default("open"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  requirements: text("requirements"),
  attachments: text("attachments").array(),
});

export const proposals = pgTable("proposals", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull().references(() => projects.id),
  freelancerId: integer("freelancer_id").notNull().references(() => users.id),
  coverLetter: text("cover_letter").notNull(),
  bidAmount: doublePrecision("bid_amount").notNull(),
  estimatedDuration: integer("estimated_duration"),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const contracts = pgTable("contracts", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull().references(() => projects.id),
  clientId: integer("client_id").notNull().references(() => users.id),
  freelancerId: integer("freelancer_id").notNull().references(() => users.id),
  proposalId: integer("proposal_id").references(() => proposals.id),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"),
  amount: doublePrecision("amount").notNull(),
  status: text("status").notNull().default("active"),
  terms: text("terms"),
  milestones: json("milestones"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  contractId: integer("contract_id").notNull().references(() => contracts.id),
  reviewerId: integer("reviewer_id").notNull().references(() => users.id),
  revieweeId: integer("reviewee_id").notNull().references(() => users.id),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  senderId: integer("sender_id").notNull().references(() => users.id),
  receiverId: integer("receiver_id").notNull().references(() => users.id),
  content: text("content").notNull(),
  isRead: boolean("is_read").default(false),
  projectId: integer("project_id").references(() => projects.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  attachments: text("attachments").array(),
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  subject: text("subject"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  categoryId: integer("category_id").references(() => categories.id),
});

export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  contractId: integer("contract_id").notNull().references(() => contracts.id),
  amount: doublePrecision("amount").notNull(),
  status: text("status").notNull().default("pending"),
  paymentMethod: text("payment_method"),
  transactionId: text("transaction_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  id: true,
  email: true,
  firstName: true, 
  lastName: true,
  profileImageUrl: true,
  role: true,
  bio: true,
  skills: true,
  location: true,
  hourlyRate: true,
});

// Define a schema for Replit Auth user upsert operations
export const upsertUserSchema = createInsertSchema(users).pick({
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  profileImageUrl: true,
});

export const insertCategorySchema = createInsertSchema(categories).pick({
  name: true,
  description: true,
  icon: true,
});

export const insertProjectSchema = createInsertSchema(projects).pick({
  title: true,
  description: true,
  budget: true,
  deadline: true,
  clientId: true,
  categoryId: true,
  requirements: true,
  attachments: true,
});

export const insertProposalSchema = createInsertSchema(proposals).pick({
  projectId: true,
  freelancerId: true,
  coverLetter: true,
  bidAmount: true,
  estimatedDuration: true,
});

export const insertContractSchema = createInsertSchema(contracts).pick({
  projectId: true,
  clientId: true,
  freelancerId: true,
  proposalId: true,
  startDate: true,
  endDate: true,
  amount: true,
  terms: true,
  milestones: true,
});

export const insertReviewSchema = createInsertSchema(reviews).pick({
  contractId: true,
  reviewerId: true,
  revieweeId: true,
  rating: true,
  comment: true,
});

export const insertMessageSchema = createInsertSchema(messages).pick({
  senderId: true,
  receiverId: true,
  content: true,
  projectId: true,
  attachments: true,
});

export const insertContactSchema = createInsertSchema(contactSubmissions).pick({
  fullName: true,
  email: true,
  phone: true,
  subject: true,
  message: true,
});

export const insertSkillSchema = createInsertSchema(skills).pick({
  name: true,
  categoryId: true,
});

export const insertPaymentSchema = createInsertSchema(payments).pick({
  contractId: true,
  amount: true,
  paymentMethod: true,
  transactionId: true,
});

// Export types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

export type InsertProposal = z.infer<typeof insertProposalSchema>;
export type Proposal = typeof proposals.$inferSelect;

export type InsertContract = z.infer<typeof insertContractSchema>;
export type Contract = typeof contracts.$inferSelect;

export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Review = typeof reviews.$inferSelect;

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;

export type InsertContact = z.infer<typeof insertContactSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

export type InsertSkill = z.infer<typeof insertSkillSchema>;
export type Skill = typeof skills.$inferSelect;

export type InsertPayment = z.infer<typeof insertPaymentSchema>;
export type Payment = typeof payments.$inferSelect;
