if [ $env == "dev" ]; then
    # docker stop react-practice
    # docker rm react-practice
    docker build -t custom-nginx .
    docker run --name react-practice -d -p 8080:80 custom-nginx
elif [ $env == 'prod' ]; then
    # TODO
fi