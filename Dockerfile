# TODO: 提供Docker镜像方便整体的部署
FROM node:latest

WORKDIR /app

COPY ./dist ./src
COPY ./package.json ./package.json
COPY ./tsconfig.json ./tsconfig.json
COPY ./yarn.lock ./yarn.lock

# RUN ls -al
RUN npx yarn

CMD [ "node", "-r", "tsconfig-paths/register", "src/main" ]

EXPOSE 3001
