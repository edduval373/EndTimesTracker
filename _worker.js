// This ensures Cloudflare Pages serves the static site, not the Express server
export default {
  fetch(request, env, ctx) {
    // Let Cloudflare Pages handle the request normally
    return env.ASSETS.fetch(request);
  }
};