FROM node:20-alpine

EXPOSE 3001

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install

COPY prisma ./prisma

RUN npx prisma generate

COPY . .

CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma db seed && yarn start:dev"]
