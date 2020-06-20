FROM node:14-alpine

RUN apk add --no-cache bash git \
    && npm install --global --unsafe-perm expo-cli@3.21.9 \
    && npm cache clean --force

WORKDIR /code