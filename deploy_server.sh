#!/bin/bash

echo Compiling packages...
yarn build:server

echo Building image...
# I have an Macbook with M1, so, I use
# docker's buildx to build my image for amd64
# which is supported by heroku
# For it to work run: docker buildx create --use
docker buildx build --platform linux/amd64 -t billvog/ferman:latest . --load

echo Tagging image...
docker tag billvog/ferman:latest registry.heroku.com/ferman/web

echo Pushing image to Heroku...
docker push registry.heroku.com/ferman/web

echo Releasing image...
heroku container:release web