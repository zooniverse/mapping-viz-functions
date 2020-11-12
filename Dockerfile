FROM node:10
WORKDIR /src

# PostgreSQL 9.5 apt package setup
RUN echo $(grep "VERSION=" /etc/os-release | cut -d "(" -f2 | cut -d ")" -f1) | \
  xargs -i echo "deb http://apt.postgresql.org/pub/repos/apt/ {}-pgdg main" > /etc/apt/sources.list.d/postgresql.list && \
  wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -

# Azure Functions Core Tools 3 package setup
RUN apt-get update && apt-get install -y apt-transport-https lsb-release && \
  curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg && \
  mv microsoft.gpg /etc/apt/trusted.gpg.d/microsoft.gpg && \
  sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/debian/$(lsb_release -rs | cut -d'.' -f 1)/prod $(lsb_release -cs) main" > /etc/apt/sources.list.d/dotnetdev.list'

# install PostgreSQL and Azure Functions
RUN apt-get update && apt-get -y upgrade && \
  apt-get install --no-install-recommends -y \
  postgresql-client-9.5 azure-functions-core-tools-3 && \
  apt-get clean

ADD package.json /src/
ADD package-lock.json /src/
ADD yarn.lock /src/

RUN yarn install

ADD . /src/

CMD ["yarn", "start"]