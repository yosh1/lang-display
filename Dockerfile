FROM node:10.18.0-alpine

ENV NODE_ENV=development

ARG project_dir=/app/
COPY package*.json ${project_dir}}
WORKDIR ${project_dir}

RUN set -x && \
    yarn

COPY . ${project_dir}

EXPOSE 3000

CMD ["yarn", "start"]
