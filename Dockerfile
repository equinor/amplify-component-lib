# Base
FROM node:19-alpine as base
WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
COPY tsconfig*.json ./

# Dependencies
FROM base as dependencies
WORKDIR /app
RUN yarn install
COPY src src
COPY .storybook .storybook
COPY static static
COPY .eslintrc.cjs .eslintrc.cjs
COPY vite.config.ts vite.config.ts

# Build
FROM dependencies as builder
WORKDIR /app
RUN yarn run build-storybook

# STAGE 2 => SETUP NGINX and Run
FROM nginxinc/nginx-unprivileged:alpine
USER 0
# Clear default nginx html file
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/storybook-static /usr/share/nginx/html
COPY proxy/nginx.conf /etc/nginx/conf.d/default.conf
COPY proxy/securityheaders.conf /etc/nginx/securityheaders.conf

RUN chown -R 101 /etc/nginx/conf.d \
    && chown -R 101 /usr/share/nginx/html

USER 101

CMD ["nginx", "-g", "daemon off;"]
