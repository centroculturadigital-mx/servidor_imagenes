FROM node:11


ENV HOME=/usr/servidor_imagenes

# COPY ./package.json $HOME
COPY . $HOME

WORKDIR $HOME

# RUN npm install

RUN npm install -g nodemon


CMD ["nodemon","server.js"]





