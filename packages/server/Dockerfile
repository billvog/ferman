FROM node:14

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .
COPY .env.prod .env

RUN yarn build

ENV NODE_ENV production

EXPOSE 8080
CMD ["yarn", "start"]
USER node