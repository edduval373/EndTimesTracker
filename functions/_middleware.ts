// Cloudflare Pages Functions middleware
export const onRequest: PagesFunction = async (context) => {
  try {
    const url = new URL(context.request.url);
    
    // Handle API routes by proxying to the server
    if (url.pathname.startsWith('/api/')) {
      // In Cloudflare Pages, we need to handle API routes differently
      // For now, return a 404 - the actual server will handle this
      return new Response('API endpoint not available in static deployment', { 
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    // For all other routes, serve the SPA
    return context.next();
  } catch (error) {
    console.error('Middleware error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};