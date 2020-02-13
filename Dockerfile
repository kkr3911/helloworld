#FROM node:argon
FROM node:6.4.0
RUN mkdir -p /usr/local/helloworld/
COPY helloworld.js package.json /usr/local/helloworld/
WORKDIR /usr/local/helloworld/
RUN npm install --production
EXPOSE 3000
ENTRYPOINT [ "node", "helloworld.js" ]
