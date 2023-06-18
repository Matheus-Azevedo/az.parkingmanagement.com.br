# Use the Node.js LTS (Long Term Support) version as the base image
FROM node:lts

# Set the working directory inside the container
WORKDIR /app/backend

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose a port if your application needs to listen on a specific port
EXPOSE 3333

# Specify the command to run your application
CMD [ "npm", "run", "dev", "&&", "npx", "prisma", "migrate", "dev", "&&", "npx", "prisma", "db", "seed" ]