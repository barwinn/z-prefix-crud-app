FROM node:alpine 

WORKDIR /app

COPY . /app
RUN npm install nodemon &&\
    npm install

EXPOSE 8082

CMD ["npm", "start"]