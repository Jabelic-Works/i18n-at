#!/bin/bash

# Cloudflare Pages build script for VitePress
echo "Starting VitePress build..."

# Install dependencies
pnpm install --frozen-lockfile

# Build the documentation
pnpm run docs:build

# Copy static files to output directory
cp _headers .vitepress/dist/
cp _redirects .vitepress/dist/

echo "Build completed successfully!"
echo "Output directory: .vitepress/dist"
