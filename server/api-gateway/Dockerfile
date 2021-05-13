FROM node AS build

WORKDIR /usr/src/app

COPY . .

RUN yarn install --frozen-lockfile && yarn build

FROM node:14-alpine AS production

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
