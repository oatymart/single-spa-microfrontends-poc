FROM node:22-alpine AS build-root-config

WORKDIR /app

# install deps
COPY ./host-app/root-config/package.json ./host-app/root-config/package-lock.json ./
RUN npm ci

# copy sources & build
COPY ./host-app/root-config/ ./
RUN npm run build


#------------------------------------------------------------
FROM node:22-alpine AS build-common

WORKDIR /app

COPY ./host-app/common/package.json ./host-app/common/package-lock.json ./
RUN npm ci

COPY ./host-app/common/ ./
RUN npm run build


#------------------------------------------------------------
FROM node:22-alpine AS build-mfe1

WORKDIR /app

COPY ./packages/mfe1/package.json ./packages/mfe1/package-lock.json ./
RUN npm ci

COPY ./packages/mfe1/ ./
RUN npm run build


#------------------------------------------------------------
FROM node:22-alpine AS build-mfe2

WORKDIR /app

COPY ./packages/mfe2/package.json ./packages/mfe2/package-lock.json ./
RUN npm ci

COPY ./packages/mfe2/ ./
RUN npm run build


# ======= production server stage
FROM nginx:1.27.4-alpine

EXPOSE 8090

COPY --from=build-root-config --chown=nginx /app/dist /var/www/html
COPY --from=build-common --chown=nginx /app/dist /var/www/html/common
COPY --from=build-mfe1 --chown=nginx /app/dist /var/www/html/mfe1
COPY --from=build-mfe2 --chown=nginx /app/dist /var/www/html/mfe2

COPY --chown=nginx ./docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --chown=nginx ./docker/nginx/default.conf /etc/nginx/conf.d/default.conf

RUN set -eux; \
    chown -R nginx:nginx /var/cache/nginx; \
    chown -R nginx:nginx /var/log/nginx; \
    \
    touch /var/run/nginx.pid; \
    chown -R nginx:nginx /var/run/nginx.pid

USER nginx
ENTRYPOINT ["nginx"]
# CMD ["nginx", "-g", "daemon off;"]
