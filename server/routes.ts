import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertNewsEventSchema, insertUserSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Biblical Events routes
  app.get("/api/biblical-events", async (req, res) => {
    try {
      const events = await storage.getBiblicalEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch biblical events" });
    }
  });

  app.get("/api/biblical-events/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const event = await storage.getBiblicalEventById(id);
      if (!event) {
        return res.status(404).json({ message: "Biblical event not found" });
      }
      res.json(event);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch biblical event" });
    }
  });

  // News Events routes
  app.get("/api/news-events", async (req, res) => {
    try {
      const events = await storage.getNewsEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch news events" });
    }
  });

  // Fetch news from external API
  app.get("/api/news/fetch", async (req, res) => {
    try {
      const newsApiKey = process.env.NEWS_API_KEY || process.env.VITE_NEWS_API_KEY || "default_key";
      
      const response = await fetch(`https://newsapi.org/v2/everything?q=israel+OR+palestine+OR+jerusalem+OR+temple+OR+prophecy+OR+christian+persecution&sortBy=publishedAt&apiKey=${newsApiKey}`);
      
      if (!response.ok) {
        throw new Error(`News API error: ${response.status}`);
      }

      const data = await response.json();
      
      // Process and store relevant news
      const relevantNews = data.articles?.slice(0, 10).map((article: any) => ({
        title: article.title,
        description: article.description || article.content?.substring(0, 200) + "...",
        source: article.source?.name || "Unknown",
        category: categorizeNews(article.title, article.description),
        publishedAt: article.publishedAt,
        url: article.url
      }));

      // Store news events
      const storedEvents = [];
      for (const news of relevantNews || []) {
        try {
          const validatedNews = insertNewsEventSchema.parse(news);
          const storedEvent = await storage.createNewsEvent(validatedNews);
          storedEvents.push(storedEvent);
        } catch (error) {
          console.error("Error storing news event:", error);
        }
      }

      res.json(storedEvents);
    } catch (error) {
      console.error("Error fetching news:", error);
      res.status(500).json({ message: "Failed to fetch news from external API" });
    }
  });

  // Prophetic Topics routes
  app.get("/api/prophetic-topics", async (req, res) => {
    try {
      const topics = await storage.getPropheticTopics();
      res.json(topics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch prophetic topics" });
    }
  });

  app.get("/api/prophetic-topics/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const topic = await storage.getPropheticTopicById(id);
      if (!topic) {
        return res.status(404).json({ message: "Prophetic topic not found" });
      }
      res.json(topic);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch prophetic topic" });
    }
  });

  // Users routes
  app.get("/api/users", async (req, res) => {
    const { email } = req.query;
    
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ message: "Email parameter is required" });
    }
    
    try {
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  app.post("/api/users", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(200).json(existingUser);
      }
      
      // Create new user
      const newUser = await storage.createUser(validatedData);
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: "Failed to create user" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

function categorizeNews(title: string, description: string): string {
  const content = (title + " " + description).toLowerCase();
  
  if (content.includes("israel") || content.includes("palestine") || content.includes("jerusalem")) {
    return "Israel/Palestine";
  }
  if (content.includes("christian") || content.includes("persecution") || content.includes("religious")) {
    return "Religious Freedom";
  }
  if (content.includes("temple") || content.includes("archaeological")) {
    return "Archaeology";
  }
  if (content.includes("disaster") || content.includes("earthquake") || content.includes("flood")) {
    return "Natural Disasters";
  }
  
  return "Global Events";
}
