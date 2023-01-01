VERSION="lastest"
while getopts ":v:" options; do
    case "${options}" in
    v)
        VERSION=${OPTARG}
        ;;
    :)
        echo "Error: -${OPTARG} requires an argument."
        exit 1
        ;;
    *)
        exit 1
        ;;
  esac
done

if [[ $env == "dev" ]]; then
    docker build -t front-end:${VERSION} --build-arg ENV_FILE=.env.development . 
    docker stop react-practice
    docker rm react-practice
    docker run --name react-practice -d -p 8080:80 front-end:${VERSION}
elif [[ $env == 'prod' ]]; then
    docker build -t front-end:${VERSION} --build-arg ENV_FILE=.env.production . 
fi