FROM node:14

# Create app directory
WORKDIR /ferman

# Install app dependencies
COPY package.json ./
COPY yarn.lock ./

RUN yarn

# Copy files
COPY . .
COPY .env.production .env

# Build
RUN yarn build

ENV NODE_ENV production

EXPOSE 8080
CMD [ "node", "dist/index.js" ]