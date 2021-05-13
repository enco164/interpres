FROM nginx:stable-alpine

# Create the nginx setup
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3626
CMD ["sh", "-c", "nginx -g 'daemon off;'"]
