FROM node AS development

WORKDIR /usr/src/app

COPY . .

RUN yarn install --frozen-lockfile

RUN yarn build

FROM node:current-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
