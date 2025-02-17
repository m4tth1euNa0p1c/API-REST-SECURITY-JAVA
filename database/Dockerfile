FROM mongo:latest
COPY init-mongo.js /docker-entrypoint-initdb.d/
RUN chmod 644 /docker-entrypoint-initdb.d/init-mongo.js
