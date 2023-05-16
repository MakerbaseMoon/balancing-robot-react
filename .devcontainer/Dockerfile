FROM node:18.16.0

RUN apt update
RUN apt install -y sudo

RUN yarn global add react-devtools

RUN echo "node ALL=(ALL:ALL) NOPASSWD:ALL" >> /etc/sudoers.d/node

USER node
