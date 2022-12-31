if [[ $env == "dev" ]]; then
    docker build -t front-end:1.3 --build-arg ENV_FILE=.env.development . 
    docker stop react-practice
    docker rm react-practice
    docker run --name react-practice -d -p 8080:80 front-end:1.3
elif [[ $env == 'prod' ]]; then
    docker build -t front-end:1.3 --build-arg ENV_FILE=.env.production . 
fi