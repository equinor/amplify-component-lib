# Base
FROM node:19-alpine as base
WORKDIR /app
RUN npm install -g http-server@14.0.0
COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
COPY .eslintrc.js ./

# Dependencies
FROM base as dependencies
WORKDIR /app
RUN npm install --frozen-lockfile --ignore-scripts --legacy-peer-deps
COPY src src
COPY public public

# Run tests
FROM dependencies as test
WORKDIR /app
RUN CI=true yarn test

# Build
FROM dependencies as builder
WORKDIR /app
RUN yarn build -s

# STAGE 2 => SETUP NGINX and Run
FROM nginxinc/nginx-unprivileged:alpine
USER 0
# Clear default nginx html file
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/build /usr/share/nginx/html
COPY proxy/nginx.conf /etc/nginx/conf.d/default.conf.template

EXPOSE 5001
ENV APPSETTING_ENV=local

# Copy .env file and shell script to container to handle
# runtime environment variables
WORKDIR /usr/share/nginx/html
COPY ./env.sh .

RUN rm -rf ./env-config.js
RUN touch ./env-config.js
RUN chown nginx ./env-config.js
RUN chown -R nginx /etc/nginx/conf.d \
    && chown -R nginx /usr/share/nginx/html \
    && chmod +x ./env.sh

# Add bash shell
RUN apk update
RUN apk add --no-cache bash

USER 101

CMD ["/bin/bash", "-c", "./env.sh && nginx -g \"daemon off;\""]
