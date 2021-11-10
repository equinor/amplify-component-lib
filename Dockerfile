# Base
FROM node:16 as base
WORKDIR /app
RUN yarn global add serve
COPY package*.json ./
COPY yarn.lock ./
COPY tsconfig*.json ./

# Dependencies
FROM base as dependencies
WORKDIR /app
RUN yarn install
COPY src src
COPY .storybook .storybook

# Build
FROM dependencies as builder
WORKDIR /app
RUN yarn run build-storybook
COPY Dockerfile storybook-static

# STAGE 2 => SETUP NGINX and Run
FROM nginxinc/nginx-unprivileged:stable
USER 0
# Clear default nginx html file
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/storybook-static /usr/share/nginx/html
COPY proxy/nginx.conf /etc/nginx/conf.d/default.conf.template