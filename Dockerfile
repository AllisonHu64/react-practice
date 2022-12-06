FROM node:16.13.0 as builder
WORKDIR /usr/ahu/code/
RUN git clone https://github.com/AllisonHu64/react-practice.git
RUN cd ./react-practice && yarn install && yarn build
FROM nginx
COPY --from=0 /usr/ahu/code/react-practice/build /usr/share/nginx/html
EXPOSE 80

# docker build -t custom-nginx .
# docker run --name some-nginx -d -p 8080:80 custom-nginx