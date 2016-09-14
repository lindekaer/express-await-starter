# Base Node image of version 6.0
FROM node:6.0

# Create a new user to run our Node process
RUN useradd --user-group --create-home --shell /bin/false nodejs

# Set environment variables
ENV HOME=/home/nodejs
ENV NODE_ENV=production

# Create the app folder for our application
RUN mkdir -p $HOME/app

# Copy the package.json to the app folder
COPY package.json $HOME/app

# Give our user full ownership of the app folder
RUN chown -R nodejs:nodejs $HOME/*

# Swith to the new user
USER nodejs

# Navigate to the app folder
WORKDIR $HOME/app

# Install all Node modules
RUN npm install

# Copy all the application files to the
COPY . $HOME/app

# Launch the application
CMD ["node", "server.js"]
