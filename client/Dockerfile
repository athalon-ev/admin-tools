FROM node:14

WORKDIR /app
ADD package.json /app/
ADD yarn.lock /app/

RUN yarn

ADD . /app/
RUN yarn build

ENV HOST 0.0.0.0
EXPOSE 3000

CMD [ "yarn", "start" ]
