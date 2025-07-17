import { biblicalEvents, newsEvents, propheticTopics, users, type BibleEvent, type InsertBiblicalEvent, type NewsEvent, type InsertNewsEvent, type PropheticTopic, type InsertPropheticTopic, type User, type InsertUser } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Biblical Events
  getBiblicalEvents(): Promise<BibleEvent[]>;
  getBiblicalEventById(id: number): Promise<BibleEvent | undefined>;
  createBiblicalEvent(event: InsertBiblicalEvent): Promise<BibleEvent>;
  
  // News Events
  getNewsEvents(): Promise<NewsEvent[]>;
  getNewsEventById(id: number): Promise<NewsEvent | undefined>;
  createNewsEvent(event: InsertNewsEvent): Promise<NewsEvent>;
  
  // Prophetic Topics
  getPropheticTopics(): Promise<PropheticTopic[]>;
  getPropheticTopicById(id: number): Promise<PropheticTopic | undefined>;
  createPropheticTopic(topic: InsertPropheticTopic): Promise<PropheticTopic>;
  
  // Users
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getUserById(id: number): Promise<User | undefined>;
}

export class DatabaseStorage implements IStorage {
  // Biblical Events
  async getBiblicalEvents(): Promise<BibleEvent[]> {
    const events = await db.select().from(biblicalEvents);
    return events;
  }

  async getBiblicalEventById(id: number): Promise<BibleEvent | undefined> {
    const [event] = await db.select().from(biblicalEvents).where(eq(biblicalEvents.id, id));
    return event || undefined;
  }

  async createBiblicalEvent(insertEvent: InsertBiblicalEvent): Promise<BibleEvent> {
    const [event] = await db
      .insert(biblicalEvents)
      .values(insertEvent)
      .returning();
    return event;
  }

  // News Events
  async getNewsEvents(): Promise<NewsEvent[]> {
    const events = await db.select().from(newsEvents);
    return events;
  }

  async getNewsEventById(id: number): Promise<NewsEvent | undefined> {
    const [event] = await db.select().from(newsEvents).where(eq(newsEvents.id, id));
    return event || undefined;
  }

  async createNewsEvent(insertEvent: InsertNewsEvent): Promise<NewsEvent> {
    const [event] = await db
      .insert(newsEvents)
      .values(insertEvent)
      .returning();
    return event;
  }

  // Prophetic Topics
  async getPropheticTopics(): Promise<PropheticTopic[]> {
    const topics = await db.select().from(propheticTopics);
    return topics;
  }

  async getPropheticTopicById(id: number): Promise<PropheticTopic | undefined> {
    const [topic] = await db.select().from(propheticTopics).where(eq(propheticTopics.id, id));
    return topic || undefined;
  }

  async createPropheticTopic(insertTopic: InsertPropheticTopic): Promise<PropheticTopic> {
    const [topic] = await db
      .insert(propheticTopics)
      .values(insertTopic)
      .returning();
    return topic;
  }

  // Users
  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getUserById(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }
}

export const storage = new DatabaseStorage();
