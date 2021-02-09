FROM node:14 as build

WORKDIR /usr/src/app

COPY . .

RUN yarn install
RUN yarn run build:gateway


FROM node:14 as production

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY --from=build /usr/src/app/dist/apps/gateway ./dist

CMD ["node", "dist/main"]
