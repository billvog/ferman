FROM node:14

WORKDIR /ferman/api

COPY ./package.json .
COPY ./yarn.lock .
COPY ./packages/server/package.json ./packages/server/
COPY ./packages/common/package.json ./packages/common/

RUN yarn install --production

COPY ./packages/server/dist ./packages/server/dist
COPY ./packages/common/dist ./packages/common/dist
COPY ./packages/server/.env.production ./packages/server/.env
COPY ./packages/server/.env.example ./packages/server/

WORKDIR /ferman/api/packages/server

ENV NODE_ENV production

EXPOSE 8080
CMD ["node", "dist/index.js"]