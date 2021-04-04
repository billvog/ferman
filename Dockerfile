FROM node

WORKDIR /ferman/api

COPY ./package.json .
COPY ./yarn.lock .
COPY ./packages/server/package.json ./packages/server/
COPY ./packages/common/package.json ./packages/common/

RUN yarn install --production

COPY ./packages/server/dist ./packages/server/dist
COPY ./packages/common/dist ./packages/common/dist
COPY ./packages/server/.env.prod ./packages/server/.env
COPY ./packages/server/.env.example ./packages/server/

WORKDIR /ferman/api/packages/server

ENV NODE_ENV production

EXPOSE 4000
CMD ["yarn", "start"]