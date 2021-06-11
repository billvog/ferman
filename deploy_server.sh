#!/bin/bash
echo Compiling packages...
yarn build:server

VERSION=latest

echo Building image...
# docker's buildx builds and converts my image from arm to amd64
docker buildx use default
docker buildx build --platform linux/amd64 -t billvog/ferman:$VERSION packages/server --push

echo Deploying image to dokku...
ssh-add ~/.ssh/ferman-main.pem
ssh ubuntu@3.67.249.185 "sudo docker pull billvog/ferman:$VERSION && sudo docker tag billvog/ferman:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"
