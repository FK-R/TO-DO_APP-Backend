FROM node:16
COPY db.sql /docker-entrypoint-initdb.d/
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "dev"]