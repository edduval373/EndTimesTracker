// API handler for Cloudflare Pages Functions
import { app } from '../../server/index';

export const onRequest: PagesFunction = async (context) => {
  try {
    // Extract the path from the request
    const url = new URL(context.request.url);
    const path = url.pathname.replace('/api/', '');
    
    // Create a new URL with the correct path
    const serverUrl = new URL(`/api/${path}`, url.origin);
    
    // Create a new request with the server URL
    const serverRequest = new Request(serverUrl, {
      method: context.request.method,
      headers: context.request.headers,
      body: context.request.body
    });
    
    // Call the Express app
    return await app(serverRequest, context.env);
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};