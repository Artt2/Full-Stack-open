FROM node:16

WORKDIR /FSD/part12/part12-containers-applications/todo-app/todo-backend

COPY --chown=node:node . .
RUN npm ci

USER node
CMD npm start