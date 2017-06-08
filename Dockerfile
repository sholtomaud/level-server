FROM node:argon

RUN useradd --user-group --create-home --shell /bin/false app

ENV HOME=/home/app

COPY package.json package-lock.json $HOME/level-server/
RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/level-server

RUN mkdir /tmp/logs/

RUN npm install --production

EXPOSE 8080
CMD [ "npm", "start" ]
