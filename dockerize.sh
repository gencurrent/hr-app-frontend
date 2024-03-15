# Push build and push the image into the repository

docker build . -t europe-west6-docker.pkg.dev/hr-app-365322/hr-app-docker-registry/hr-app-frontend
docker push europe-west6-docker.pkg.dev/hr-app-365322/hr-app-docker-registry/hr-app-frontend
