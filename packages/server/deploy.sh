#!/bin/bash

echo What should the version be?
read VERSION

echo Building docker image...
docker build -t billvog/ferman:$VERSION .
echo Uploading image to Docker Hub...
docker push billvog/ferman:$VERSION
echo Deploy image to dokku...
ssh -i ~/.ssh/ferman-master.pem ubuntu@api.ferman.ga "sudo docker pull billvog/ferman:$VERSION && sudo docker tag billvog/ferman:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"