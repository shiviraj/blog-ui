FROM node:19.8.1-alpine3.17 AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install


FROM node:19.8.1-alpine3.17 AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build
RUN npm install --production --ignore-scripts --prefer-offline

FROM node:19.8.1-alpine3.17
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000
ENV PORT 3000
CMD ["node_modules/.bin/next", "start"]
