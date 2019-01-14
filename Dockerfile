FROM node:10-slim

LABEL "com.github.actions.name"="Github Deployment"
LABEL "com.github.actions.description"="Create a Github deployment and set a status"
LABEL "com.github.actions.icon"="moon"
LABEL "com.github.actions.color"="green"

LABEL "repository"="https://github.com/NiklasMerz/github-deployment-action"
LABEL "maintainer"="Niklas Merz"


WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

COPY "entrypoint.sh" "/entrypoint.sh"
ENTRYPOINT ["/entrypoint.sh"]
CMD [""]