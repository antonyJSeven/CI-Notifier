FROM node:alpine
RUN apk add --update git openssh && \
  rm -rf /tmp/* /var/cache/apk/*
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5002
CMD [ "npm", "server" ]
