FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm install

CMD ["npm", "start", "--", "PORT=5000"]