#!/bin/bash

# Build script for production deployment
echo "Building frontend..."
npm run build

echo "Building server..."
npm run build:server

echo "Build completed successfully!"
echo "Frontend built to: dist/public"
echo "Server built to: dist/index.js"