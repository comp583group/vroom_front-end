# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the project
RUN npm run build

# Set NODE_ENV to development for hot reloading
ENV NODE_ENV=development

# Expose port 3000 for Next.js
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "run", "dev"]
