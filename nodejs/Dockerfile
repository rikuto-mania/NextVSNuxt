FROM node:22-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json* ./
COPY prisma ./prisma
RUN npm ci

RUN npx prisma generate

CMD ["npm","run","dev"]