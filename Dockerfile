FROM node:alpine
ARG SSH_PRIVATE_KEY
RUN apk add --update git openssh && \
  rm -rf /tmp/* /var/cache/apk/*
RUN mkdir -p /root/.ssh && chmod 700 /root/.ssh && echo "-----BEGIN RSA PRIVATE KEY-----" > /root/.ssh/id_rsa && printf '%s\n' "$SSH_PRIVATE_KEY" >> /root/.ssh/id_rsa && echo "-----END RSA PRIVATE KEY-----" >> /root/.ssh/id_rsa && chmod 600 /root/.ssh/id_rsa && \
    echo 'StrictHostKeyChecking no' > /root/.ssh/config && \
    ssh-keyscan -t rsa git.sami.int.thomsonreuters.com >> /root/.ssh/known_hosts
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5002
CMD [ "npm", "server" ]
