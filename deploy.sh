if [ $env == "dev" ]; then
    yarn build
    docker build -t front-end:1.3 . 
    # TODO fix this, error with env passing
    docker stop react-practice
    docker rm react-practice
    docker run --name react-practice -d -p 8080:80 \
    -e REACT_APP_BACKEND_DOMAIN=$REACT_APP_BACKEND_DOMAIN \
    -e REACT_APP_BACKEND_PORT=$REACT_APP_BACKEND_PORT \
    front-end:1.3
elif [ $env == 'prod' ]; then
    # TODO
    yarn build
    docker build -t front-end:1.3 . 
fi