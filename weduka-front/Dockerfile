FROM --platform=linux/amd64 alpine:3.17

ENV NODE_VERSION 18.19.0

RUN apk add --upgrade nodejs
RUN apk add --upgrade npm

RUN npm --version
RUN node --version

WORKDIR /app

# Installing dependencies
RUN npm install -g corepack@0.24.1
RUN corepack prepare yarn@3.2.4 --activate
COPY .yarnrc.yml ./
COPY package.json ./
COPY yarn.lock ./
RUN yarn config
RUN yarn install --immutable

# Copying source files
COPY . .

# Building app
RUN yarn build
EXPOSE 3000

# Running app
ENTRYPOINT [ "yarn", "start" ]
