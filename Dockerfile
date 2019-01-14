FROM node:10

LABEL "com.github.actions.name"="Github Deployment"
LABEL "com.github.actions.description"="Create a Github deployment and set a status"
LABEL "com.github.actions.icon"="moon"
LABEL "com.github.actions.color"="green"


WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["node", "deployment.js"]
