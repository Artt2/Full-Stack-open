FROM node:16

WORKDIR /FSD/part12/part12-containers-applications/todo-app/todo-frontend

COPY . .

RUN npm ci

ENV REACT_APP_BACKEND_URL=http://localhost:3000

RUN npm run build

RUN npm install -g serve

CMD ["serve", "-s", "build", "-p", "3000"]