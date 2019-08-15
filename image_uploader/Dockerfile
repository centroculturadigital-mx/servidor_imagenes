FROM node:11

ENV HOME=/home/src

COPY . $HOME

WORKDIR $HOME



COPY package.json $HOME/package.json

RUN npm install


COPY .  $HOME

EXPOSE 8000

RUN npm install -g nodemon


CMD [ "nodemon", "server.js" ]

