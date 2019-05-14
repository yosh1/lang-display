FROM node:10.15.3-alpine

ENV NODE_ENV=development

ARG project_dir=/app/
ADD . ${project_dir}
WORKDIR ${project_dir}

RUN apk update && \
    npm install

EXPOSE 3000

CMD ["npm", "run", "start"]
