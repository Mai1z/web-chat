FROM node:12.18.3-alpine as builder

WORKDIR /home/app/

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "start"]

