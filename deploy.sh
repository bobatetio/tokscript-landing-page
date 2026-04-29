#!/bin/bash

# Install the project's dependencies
npm install

# Create a production build
npm run build

# Check if the app is already running in PM2. If it is, stop and delete it.
if pm2 info tokscript-v2-next-production > /dev/null; then
    pm2 delete tokscript-v2-next-production
fi

# Start the application in production mode with PM2 on port 3007
PORT=3007 pm2 start npm --name "tokscript-v2-next-production" -- start

# Save the PM2 process list
pm2 save

echo "Application deployment completed and PM2 process list saved."
.next/**
umer