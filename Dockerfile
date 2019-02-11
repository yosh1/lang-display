FROM node:10.11.0-alpine

ENV NODE_ENV=development
USER root

RUN apk add --update nodejs nodejs-npm

ARG project_dir=/app/
ADD . ${project_dir}
WORKDIR ${project_dir}

RUN apk update && \
    apk add vim  \
            git && \
    apk add --update nodejs nodejs-npm && \
    npm install

EXPOSE 3000

CMD [ "npm","run","start"]
