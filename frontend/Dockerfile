# Use official Node image
FROM node:18

# Set working directory
WORKDIR /app

# Copy dependency files and install
COPY package*.json ./
RUN npm install

# Copy the rest of the frontend app
COPY . .

# Expose the frontend server port
EXPOSE 5001

# Start the Express server
CMD ["node", "server.js"]
