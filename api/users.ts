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
      console.log('POST /api/users - Request body:', req.body);
      console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
      console.log('DATABASE_URL prefix:', process.env.DATABASE_URL?.substring(0, 20) + '...');
      
      // Check if DATABASE_URL is available
      if (!process.env.DATABASE_URL) {
        console.error('DATABASE_URL environment variable is not set');
        return res.status(500).json({ 
          message: "Database configuration error", 
          error: "DATABASE_URL environment variable is not set"
        });
      }
      
      const validatedData = insertUserSchema.parse(req.body);
      console.log('Validated data:', validatedData);
      
      // Test database connection with timeout
      console.log('Testing database connection...');
      const connectionTest = Promise.race([
        storage.getUserByEmail('test@connection.com'),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Connection timeout')), 5000))
      ]);
      
      try {
        const testResult = await connectionTest;
        console.log('Connection test result:', testResult);
      } catch (connError) {
        console.error('Connection test failed:', connError);
        throw new Error(`Database connection failed: ${connError instanceof Error ? connError.message : String(connError)}`);
      }
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(validatedData.email);
      console.log('Existing user:', existingUser);
      
      if (existingUser) {
        return res.status(200).json(existingUser);
      }
      
      // Create new user
      const newUser = await storage.createUser(validatedData);
      console.log('New user created:', newUser);
      return res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
      console.error('Error name:', error instanceof Error ? error.name : 'Unknown');
      return res.status(500).json({ 
        message: "Failed to create user", 
        error: error instanceof Error ? error.message : String(error),
        type: error instanceof Error ? error.name : 'Unknown'
      });
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