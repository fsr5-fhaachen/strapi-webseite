FROM ubuntu:22.04

# Update Images
RUN apt-get update && apt-get full-upgrade -y && apt-get install -y apt-utils curl && apt-get clean

RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get update && apt-get install -y nodejs && apt-get clean && rm -rf /var/lib/apt/lists/*

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV NPM_CONFIG_LOGLEVEL=info

WORKDIR /svr/
COPY ./package*.json ./
ENV PATH /opt/node_modules/.bin:$PATH
RUN npm install
WORKDIR /svr/app
COPY ./ .
RUN npm run build

CMD ["npm", "run", "start"]