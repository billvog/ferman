FROM node:14

WORKDIR /ferman

COPY ./package.json .
COPY ./yarn.lock .
COPY ./packages/server/package.json ./packages/server/
COPY ./packages/common/package.json ./packages/common/

RUN yarn install --production

COPY ./packages/server/dist ./packages/server/
COPY ./packages/common/dist ./packages/common/
COPY ./packages/server/.env.production ./packages/server/.env
COPY ./packages/server/.env.example ./packages/server/

WORKDIR /ferman/packages/server
ENV NODE_ENV production

ENV PORT 4001

EXPOSE 4001
CMD ["node", "index.js"]