FROM node:9-alpine as build-stage

RUN apk add --update git openssh python make g++ && \
  rm -rf /tmp/* /var/cache/apk/*

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json /usr/src/app/
# Pass in your trusted hosts from ssh-keyscan
ARG SSH_KNOWN_HOSTS
RUN [ -z "$SSH_KNOWN_HOSTS" ] || (mkdir -p ~/.ssh && echo "$SSH_KNOWN_HOSTS" >> ~/.ssh/known_hosts)

RUN mkdir -p ~/.ssh && chmod 700 ~/.ssh
ARG SSH_PRIVATE_KEY
# RUN [ -z "$SSH_PRIVATE_KEY" ] || echo "$SSH_PRIVATE_KEY" | tr -d '\r' | ssh-add - > /dev/null
RUN [ -z "$SSH_PRIVATE_KEY" ] || (echo "$SSH_PRIVATE_KEY" | tr -d '\r' > ~/.ssh/id_rsa && chmod 400 ~/.ssh/id_rsa)
RUN ls ~/.ssh/
ARG SSH_PUBLIC_KEY
RUN [ -z "$SSH_PUBLIC_KEY" ] || (echo "saving SSH_PUBLIC_KEY=$SSH_PUBLIC_KEY" && echo "$SSH_PUBLIC_KEY" > ~/.ssh/id_rsa.pub)

RUN npm install

COPY . /usr/src/app
RUN npm run build
ARG NPM_PRUNE
RUN if ! [ -z "$NPM_PRUNE" ]; then npm prune; fi

FROM node:9-alpine as run-stage
COPY --from=build-stage /usr/src/app /usr/src/app
WORKDIR /usr/src/app

# default to port 5000 because it will work with GitLab Autodevops
ARG PORT=5000
ENV PORT $PORT

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV
CMD ["npm", "start"]
