# escape=`

FROM node:10.13-jessie

MAINTAINER Filipp Zhuravlev <shiningfinger@list.ru>

WORKDIR /user/src/apps/leaders
COPY package*.json /user/src/apps/leaders
COPY ./nodemon.json /user/src/apps/leaders/nodemon.json
COPY ./src /user/src/apps/leaders

RUN cd /user/src/apps/leaders && npm i
RUN npm i -g nodemon 

EXPOSE 3080

ENV SITE_HOST ""

RUN nodemon server.js
