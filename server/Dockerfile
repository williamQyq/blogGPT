FROM node:alpine
WORKDIR /app

COPY . /app/
RUN npm install

EXPOSE 5500

CMD [ "npm","run","prod" ]