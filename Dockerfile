ARG NODE_VERSION=16.13.0
FROM node:${NODE_VERSION} as builder

WORKDIR /usr/ahu/code/
RUN git clone https://github.com/AllisonHu64/react-practice.git
WORKDIR /usr/ahu/code/react-practice
COPY ./${ENV_FILE} ./react-practice/.env
RUN yarn install && yarn build

FROM nginx
COPY --from=builder /usr/ahu/code/react-practice/build /usr/share/nginx/html
# COPY ./build /usr/share/nginx/html
EXPOSE 80

# docker build -t custom-nginx .
# docker run --name some-nginx -d -p 8080:80 custom-nginx