FROM node:16.14

RUN npm install -g @nestjs/cli

COPY docker-entrypoint.sh /

RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]
