# Base
FROM node:21-alpine as base
WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./

# Dependencies
FROM base as dependencies
WORKDIR /app
RUN npm ci --ignore-scripts
COPY src src
COPY .storybook .storybook
COPY static static
COPY .eslintrc.cjs .eslintrc.cjs
COPY vite.config.ts vite.config.ts

# Build
FROM dependencies as builder
WORKDIR /app
RUN npm run build-storybook

# STAGE 2 => SETUP NGINX and Run
FROM nginxinc/nginx-unprivileged:alpine
USER 0
# Clear default nginx html file
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/storybook-static /usr/share/nginx/html
COPY proxy/nginx.conf /etc/nginx/conf.d/default.conf.template
COPY proxy/securityheaders.conf /etc/nginx/securityheaders.conf

# Copy .env file and shell script to container to handle
# runtime environment variables
WORKDIR /usr/share/nginx/html
COPY ./secrets.sh .

RUN chown -R nginx /etc/nginx/conf.d \
    && chown -R nginx /usr/share/nginx/html \
    && chmod +x ./secrets.sh

# Add bash shell
RUN apk update
RUN apk add --no-cache bash

USER 101

CMD ["/bin/bash", "-c", "./secrets.sh && nginx -g \"daemon off;\""]
