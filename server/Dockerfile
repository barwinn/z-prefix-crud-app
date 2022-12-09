FROM node:alpine

WORKDIR /app

COPY . /app

RUN npm install &&\ 
npm install knex nodemon express cors pg &&\ 
npx knex migrate:rollback &&\ 
npx knex migrate:latest &&\ 
npx knex seed:run

EXPOSE 3000

CMD ["npm", "start"]