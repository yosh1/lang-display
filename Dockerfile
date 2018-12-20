FROM node:10.11.0-alpine

ENV NODE_ENV=development
USER root

# fish / vim / git / bash
RUN apk update && apk add \
    fish \
    vim  \
    git  \
    bash

RUN apk add --update nodejs nodejs-npm

RUN npm install

ARG project_dir
ADD . ${project_dir}
WORKDIR ${project_dir}

# EXPOSE 3000

CMD [ "npm","start"]