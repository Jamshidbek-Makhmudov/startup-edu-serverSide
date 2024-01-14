#!/bin/bash

# PRODUCTION
git checkout main
git reset --hard
git pull origin main
npm i
pm2 start process.config.js --env production

# DEVELOPMENT
# pm2 start process.config.js --env development