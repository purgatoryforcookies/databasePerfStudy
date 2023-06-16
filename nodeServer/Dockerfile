FROM node:18-alpine3.17
ENV NODE_ENV=production
WORKDIR /server
COPY ./build .
CMD [ "node", "index.js" ]