import { sql } from "drizzle-orm";
import { pgTable, varchar, text, timestamp, jsonb, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const activeTasks = pgTable("active_tasks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: varchar("title").notNull(),
  type: varchar("type").notNull(),
  status: varchar("status").notNull().default("incubation"),
  agent: varchar("agent").notNull(),
  description: text("description"),
  progress: decimal("progress").default("0"),
  estimatedCost: decimal("estimated_cost").default("0"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const registryAssets = pgTable("registry_assets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  description: text("description"),
  category: varchar("category").notNull(),
  status: varchar("status").notNull().default("operational"),
  link: varchar("link"),
  metrics: jsonb("metrics"),
  twitterThread: text("twitter_thread"),
  launchedAt: timestamp("launched_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const pendingApprovals = pgTable("pending_approvals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  type: varchar("type").notNull(),
  title: varchar("title").notNull(),
  content: jsonb("content"),
  estimatedCost: decimal("estimated_cost").default("0"),
  taskId: varchar("task_id"),
  status: varchar("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertActiveTaskSchema = createInsertSchema(activeTasks).omit({ id: true, createdAt: true, updatedAt: true });
export const insertRegistryAssetSchema = createInsertSchema(registryAssets).omit({ id: true, createdAt: true, launchedAt: true });
export const insertPendingApprovalSchema = createInsertSchema(pendingApprovals).omit({ id: true, createdAt: true });

export type InsertActiveTask = z.infer<typeof insertActiveTaskSchema>;
export type ActiveTask = typeof activeTasks.$inferSelect;

export type InsertRegistryAsset = z.infer<typeof insertRegistryAssetSchema>;
export type RegistryAsset = typeof registryAssets.$inferSelect;

export type InsertPendingApproval = z.infer<typeof insertPendingApprovalSchema>;
export type PendingApproval = typeof pendingApprovals.$inferSelect;
