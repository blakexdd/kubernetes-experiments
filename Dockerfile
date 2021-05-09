FROM node:alpine3.12
WORKDIR /app
COPY package.json ./
RUN npm i
COPY . .
EXPOSE 3001
CMD ["node", "index.js"]