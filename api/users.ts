import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage.js';
import { insertUserSchema } from '../shared/schema.js';
import { pool } from '../server/db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Add debugging endpoint
  if (req.method === 'GET' && req.query.debug === 'true') {
    try {
      console.log('=== DEBUG INFO ===');
      console.log('NODE_ENV:', process.env.NODE_ENV);
      console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
      console.log('DATABASE_URL length:', process.env.DATABASE_URL?.length);
      console.log('DATABASE_URL prefix:', process.env.DATABASE_URL?.substring(0, 30) + '...');
      
      // Test raw database connection
      console.log('Testing raw database connection...');
      const testQuery = await pool.query('SELECT NOW() as current_time, version() as pg_version');
      console.log('Raw DB test successful:', testQuery.rows[0]);
      
      return res.status(200).json({
        status: 'debug',
        env: process.env.NODE_ENV,
        databaseConfigured: !!process.env.DATABASE_URL,
        databaseUrlLength: process.env.DATABASE_URL?.length,
        dbTest: testQuery.rows[0],
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Debug test failed:', error);
      return res.status(500).json({
        status: 'debug_failed',
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      });
    }
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
      
      // Test database connection with enhanced logging
      console.log('=== STARTING DATABASE TEST ===');
      console.log('Environment:', process.env.NODE_ENV);
      console.log('Database URL configured:', !!process.env.DATABASE_URL);
      
      // Test raw connection first
      try {
        console.log('Testing raw database connection...');
        const rawTest = await pool.query('SELECT 1 as test');
        console.log('Raw connection successful:', rawTest.rows[0]);
      } catch (rawError) {
        console.error('Raw connection failed:', rawError);
        throw new Error(`Raw database connection failed: ${rawError instanceof Error ? rawError.message : String(rawError)}`);
      }
      
      // Test storage layer
      try {
        console.log('Testing storage layer...');
        const storageTest = await storage.getUserByEmail('test@connection.com');
        console.log('Storage test result:', storageTest);
      } catch (storageError) {
        console.error('Storage test failed:', storageError);
        throw new Error(`Storage layer failed: ${storageError instanceof Error ? storageError.message : String(storageError)}`);
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
      console.error('=== ERROR CREATING USER ===');
      console.error('Error message:', error instanceof Error ? error.message : String(error));
      console.error('Error name:', error instanceof Error ? error.name : 'Unknown');
      console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
      console.error('Error code:', (error as any)?.code);
      console.error('Error detail:', (error as any)?.detail);
      console.error('Error hint:', (error as any)?.hint);
      console.error('Full error object:', error);
      
      return res.status(500).json({ 
        message: "Failed to create user", 
        error: error instanceof Error ? error.message : String(error),
        type: error instanceof Error ? error.name : 'Unknown',
        code: (error as any)?.code,
        detail: (error as any)?.detail,
        hint: (error as any)?.hint,
        timestamp: new Date().toISOString()
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