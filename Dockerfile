# Base
FROM node:16 as base
WORKDIR /app
RUN npm install -g serve
COPY package*.json ./
COPY yarn.lock ./
COPY tsconfig*.json ./

# Dependencies
FROM base as dependencies
WORKDIR /app
RUN npm install --frozen-lockfile
COPY src src

# Build and serve
FROM dependencies as builder
WORKDIR /app
RUN yarn run build-storybook
RUN serve storybook-static