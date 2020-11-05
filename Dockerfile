FROM node:10
WORKDIR /src

RUN echo $(grep "VERSION=" /etc/os-release | cut -d "(" -f2 | cut -d ")" -f1) | \
  xargs -i echo "deb http://apt.postgresql.org/pub/repos/apt/ {}-pgdg main" > /etc/apt/sources.list.d/postgresql.list && \
  wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -

RUN apt-get update && apt-get -y upgrade && \
  apt-get install --no-install-recommends -y \
  postgresql-client-9.5 && \
  apt-get clean

ADD package.json /src/
ADD package-lock.json /src/
ADD yarn.lock /src/

RUN yarn install

ADD . /src/

CMD ["yarn", "start"]