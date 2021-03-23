FROM node:alpine as builder

WORKDIR /app
COPY . /app

RUN yarn install --frozen-lockfile && yarn run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
