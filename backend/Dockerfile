# Path: backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build TypeScript or production assets
RUN npm run build

EXPOSE 8080

# The command to start your server
CMD ["npm", "run", "start:prod"]