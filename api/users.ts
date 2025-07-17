import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage.js';
import { insertUserSchema } from '../shared/schema.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(200).json(existingUser);
      }
      
      // Create new user
      const newUser = await storage.createUser(validatedData);
      return res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      return res.status(500).json({ message: "Failed to create user" });
    }
  }

  if (req.method === 'GET') {
    const { email } = req.query;
    
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ message: "Email parameter is required" });
    }
    
    try {
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      return res.status(500).json({ message: "Failed to fetch user" });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}