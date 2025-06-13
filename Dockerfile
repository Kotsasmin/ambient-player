# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app (using npm run build)
RUN npm run build

# Install 'serve' globally to serve the production build
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Serve the app using the 'dist' folder created by Vite
CMD ["serve", "-s", "dist", "-l", "3000"]
