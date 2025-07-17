import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const biblicalEvents = pgTable("biblical_events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  scriptureReference: text("scripture_reference").notNull(),
  status: text("status").notNull(), // 'fulfilled', 'unfulfilled', 'in_progress'
  fulfillmentDate: text("fulfillment_date"),
  category: text("category").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const newsEvents = pgTable("news_events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  source: text("source").notNull(),
  category: text("category").notNull(),
  publishedAt: text("published_at").notNull(),
  url: text("url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const propheticTopics = pgTable("prophetic_topics", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  status: text("status").notNull(), // 'active', 'pending', 'trending'
  prophecyCount: integer("prophecy_count").default(0),
  lastUpdated: timestamp("last_updated").defaultNow(),
  iconColor: text("icon_color").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertBiblicalEventSchema = createInsertSchema(biblicalEvents).omit({
  id: true,
  createdAt: true,
});

export const insertNewsEventSchema = createInsertSchema(newsEvents).omit({
  id: true,
  createdAt: true,
});

export const insertPropheticTopicSchema = createInsertSchema(propheticTopics).omit({
  id: true,
  createdAt: true,
  lastUpdated: true,
});

export type InsertBiblicalEvent = z.infer<typeof insertBiblicalEventSchema>;
export type BibleEvent = typeof biblicalEvents.$inferSelect;

export type InsertNewsEvent = z.infer<typeof insertNewsEventSchema>;
export type NewsEvent = typeof newsEvents.$inferSelect;

export type InsertPropheticTopic = z.infer<typeof insertPropheticTopicSchema>;
export type PropheticTopic = typeof propheticTopics.$inferSelect;
