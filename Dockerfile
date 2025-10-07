# Base
FROM oven/bun:1.2-alpine AS base
WORKDIR /app
COPY package.json ./
COPY bun.lock ./
COPY tsconfig.json ./
COPY src ./src
COPY .storybook ./.storybook
COPY public ./public
COPY eslint.config.js ./
COPY vite.config.ts ./

RUN bun install --frozen-lockfile && bun run build-storybook

# STAGE 2 => SETUP NGINX and Run
FROM nginxinc/nginx-unprivileged:alpine
USER 0
# Clear default nginx html file
RUN rm -rf /usr/share/nginx/html/*
COPY --from=base /app/storybook-static /usr/share/nginx/html
COPY proxy/nginx.conf /etc/nginx/conf.d/default.conf.template
COPY proxy/securityheaders.conf /etc/nginx/securityheaders.conf

# Copy .env file and shell script to container to handle
# runtime environment variables
WORKDIR /usr/share/nginx/html
COPY ./secrets.sh .

RUN chown -R nginx /etc/nginx/conf.d \
    && chown -R nginx /usr/share/nginx/html \
    && chmod +x ./secrets.sh

USER 101

CMD ["/bin/sh", "-c", "./secrets.sh && nginx -g \"daemon off;\""]
