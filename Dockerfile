FROM node:4.2

# Install TypeScript, tsd and gulp (fix versions for prod)
RUN npm install -g typescript
RUN npm install -g tsd
RUN npm install -g gulp

RUN useradd -m node
COPY . /home/node/server
RUN chown -R node:node /home/node

WORKDIR /home/node/server
RUN npm install
RUN tsd reinstall -so
RUN gulp buildAll

EXPOSE 3000
CMD ["npm", "start"]