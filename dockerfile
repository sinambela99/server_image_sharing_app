FROM node:18-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN npm install
RUN npm add sequelize-cli
COPY . .
EXPOSE 3000
CMD npm run start