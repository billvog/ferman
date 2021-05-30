#!/bin/bash

echo Compiling packages...
yarn build:server

VERSION=latest

echo Building image...
# I have an Macbook with M1, so, I use
# docker's buildx to build and convert my image from arm to amd64
# which is supported by Heroku
docker buildx use default
docker buildx build --platform linux/amd64 -t billvog/ferman:$VERSION packages/server --push

echo Deploying image to dokku...
ssh ubuntu@3.67.249.185 "sudo docker pull billvog/ferman:$VERSION && sudo docker tag billvog/ferman:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"
