# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY shared ./shared

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S copatomato -u 1001

# Copy built application
COPY --from=builder --chown=copatomato:nodejs /app/dist ./dist
COPY --from=builder --chown=copatomato:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=copatomato:nodejs /app/package*.json ./
COPY --from=builder --chown=copatomato:nodejs /app/shared ./shared

# Switch to non-root user
USER copatomato

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/api/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Start the application
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/index.js"]
