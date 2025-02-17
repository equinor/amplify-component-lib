# Base
FROM imbios/bun-node:22-alpine AS base
WORKDIR /app
COPY package.json ./
COPY bun.lockb ./
COPY tsconfig.json ./
COPY vite.config.ts ./
COPY index.html ./
COPY src ./src
COPY public ./public

# Remove mockServiceWorker.js
RUN rm -f ./public/mockServiceWorker.js

# Install dependencies and build
RUN bun install --frozen-lockfile && bun run build

# STAGE 2 => SETUP NGINX and Run
FROM nginxinc/nginx-unprivileged:alpine
USER 0
# Clear default nginx html file
RUN rm -rf /usr/share/nginx/html/*
COPY --from=base /app/dist /usr/share/nginx/html
COPY proxy/nginx.conf /etc/nginx/conf.d/default.conf.template
COPY proxy/securityheaders.conf /etc/nginx/conf.d/securityheaders.conf.template

EXPOSE 5001
ENV APPSETTING_ENV=local

# Copy .env file and shell script to container to handle
# runtime environment variables
WORKDIR /usr/share/nginx/html
COPY ./env.sh .

RUN rm -rf ./env-config.js \
  && touch ./env-config.js \
  && chown nginx ./env-config.js \
  && chown -R nginx /etc/nginx/conf.d \
  && chown -R nginx /usr/share/nginx/html \
  && chmod +x ./env.sh

# Add bash shell
CMD ["/bin/sh", "-c", "./env.sh && nginx -g \"daemon off;\""]
