# TODO: 提供Docker镜像方便整体的部署
FROM node:latest

WORKDIR /app

COPY ./dist ./dist
COPY ./package.json ./package.json
COPY ./tsconfig.base.json ./tsconfig.base.json
COPY ./tsconfig.json ./tsconfig.json
COPY ./yarn.lock ./yarn.lock

# RUN ls -al
RUN npx yarn

CMD [ "node", "-r", "tsconfig-paths/register", "dist/main" ]

EXPOSE 3001
