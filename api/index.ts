// Vercel serverless function
import express from 'express';
import { storage } from '../server/storage.js';
import { insertNewsEventSchema } from '../shared/schema.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Trust proxy for proper SSL detection
app.set('trust proxy', true);

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

// Prophetic Topics routes
app.get("/api/prophetic-topics", async (req, res) => {
  try {
    const topics = await storage.getPropheticTopics();
    res.json(topics);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch prophetic topics" });
  }
});

export default app;