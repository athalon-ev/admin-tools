FROM node:14

# Create app directory
WORKDIR /app
ADD package.json /app/
ADD yarn.lock /app/

# global install & update
RUN yarn
ADD . /app/
RUN yarn build

ENV HOST 0.0.0.0
ENV PORT 80
EXPOSE 80

RUN mkdir /app/data

# start command
CMD [ "yarn", "start" ]