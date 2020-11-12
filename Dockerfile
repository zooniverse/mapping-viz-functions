FROM node:10
WORKDIR /src

RUN echo $(grep "VERSION=" /etc/os-release | cut -d "(" -f2 | cut -d ")" -f1) | \
  xargs -i echo "deb http://apt.postgresql.org/pub/repos/apt/ {}-pgdg main" > /etc/apt/sources.list.d/postgresql.list && \
  wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -

# install PostgreSQL 9.5
RUN apt-get update && apt-get -y upgrade && \
  apt-get install --no-install-recommends -y \
  postgresql-client-9.5 && \
  apt-get clean

# install Azure Functions Core Tools 3
RUN apt-get install -y apt-transport-https && \
  curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg && \
  mv microsoft.gpg /etc/apt/trusted.gpg.d/microsoft.gpg && \
  apt-get install -y lsb-release && \
  sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/debian/$(lsb_release -rs | cut -d'.' -f 1)/prod $(lsb_release -cs) main" > /etc/apt/sources.list.d/dotnetdev.list' && \
  apt-get update && \
  apt-get install -y azure-functions-core-tools-3 && \
  apt-get clean

ADD package.json /src/
ADD package-lock.json /src/
ADD yarn.lock /src/

RUN yarn install

ADD . /src/

CMD ["yarn", "start"]