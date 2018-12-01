FROM node:8.12.0-jessie
COPY . /root/
WORKDIR /root
RUN npm i -g typescript
RUN npm install
RUN tsc
CMD ["npm", "start", "4"]
