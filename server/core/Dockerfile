FROM node:14 as build

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN yarn install
RUN yarn run build


FROM node:14 as production

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app
RUN yarn install

COPY --from=build /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
