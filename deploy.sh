#!/bin/bash

npm run build
docker build -t pzsp03-front .
docker tag pzsp03-front jciarka/pzsp03-front:latest
docker push jciarka/pzsp03-front:latest

if [[ ! $1 -eq 0 ]] ; then
    docker tag pzsp03-front "jciarka/pzsp03-front:$1"
    docker push "jciarka/pzsp03-front:$1"
fi
