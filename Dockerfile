FROM node:14-alpine

RUN apk add --no-cache --virtual .gyp \
    python \
    make \
    g++ \
    bash git

RUN npm install --global --unsafe-perm expo-cli@3.21.9

WORKDIR /code


