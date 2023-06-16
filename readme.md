to run docker image 

docker run --restart always -p 3000:3000 -e "DB_HOST=host.docker.internal" --name server mockserver