# prerequisits:
#           npm run build

# build (use correct version):
#           docker build -t pzsp03-front .
# run:
#           sudo docker run --name pzsp03-front -d -p 3001:3000 pzsp03-front 
# push:
#           sudo docker tag pzsp03-front jciarka/pzsp03-front:version
#           sudo docker push jciarka/pzsp03-front:version
#
# deploy docker-compose:
#           docker-compose -f docker-compose.yaml down
#           docker-compose -f docker-compose.yaml up -d
#

# pull the base image

FROM nginx:stable-alpine

COPY build/ /usr/share/nginx/html 