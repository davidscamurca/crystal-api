FROM node

WORKDIR /server

COPY package.json /server

RUN npm install

COPY . /server

CMD ["npm", "run", "dev"]