FROM --platform=linux/amd64 node:alpine AS builder
WORKDIR /app
COPY /*.json ./
RUN yarn install
COPY . .
RUN yarn run build

FROM --platform=linux/amd64 node:alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3000
CMD ["yarn","run","start:prod"]