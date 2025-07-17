import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      const events = await storage.getNewsEvents();
      return res.status(200).json(events);
    } catch (error) {
      console.error('Error fetching news events:', error);
      return res.status(500).json({ message: "Failed to fetch news events" });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}