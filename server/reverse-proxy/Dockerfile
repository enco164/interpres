FROM nginx:stable

# Create the nginx setup
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8090
CMD ["sh", "-c", "nginx -g 'daemon off;'"]
