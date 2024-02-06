#!/bin/bash

# PRODUCTION
git checkout main
git reset --hard
git pull origin main
npm i yarn -g
yarn global add serve
yarn install --froce
# yarn
yarn run build
pm2 start "yarn run start:prod" --name=STARTUP_EDU_SERVER
pm2 start process.config.js --env production

# DEVELOPMENT
# pm2 start process.config.js --env development

pm2 logs STARTUP_EDU_SERVER
 --lines 1000ls