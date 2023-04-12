#FROM node:16.15.0-slim  AS deps
#WORKDIR /app
#COPY package*.json ./
#RUN npm install
#
#
#FROM node:16.15.0-slim  AS builder
#WORKDIR /app
#COPY . .
#COPY --from=deps /app/node_modules ./node_modules
#RUN npm run build && npm install --production --ignore-scripts --prefer-offline

FROM node:16.15.0-slim
WORKDIR /app
ENV NODE_ENV production
COPY next.config.js ./
COPY public ./public
COPY .next ./.next
COPY node_modules ./node_modules
COPY package.json ./package.json
EXPOSE 3000
ENV PORT 3000
CMD ["node_modules/.bin/next", "start"]
