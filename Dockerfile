FROM node:20.17.0-alpine3.19

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --only=production

COPY . .

RUN npm run build

CMD ["npm", "start"]