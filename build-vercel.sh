#!/bin/bash

# Build script for Vercel deployment
echo "Building for Vercel..."

# Build frontend
echo "Building frontend..."
npm run build

# Build server
echo "Building server..."
npm run build:server

echo "Build completed successfully!"
echo "Frontend: dist/public"
echo "Server: dist/index.js"