FROM node:20-alpine3.18 AS node-builder

WORKDIR /src/

COPY ["package.json", "package-lock.json", "./"]
RUN npm install --production
COPY . .

RUN npm run build

CMD npm start

FROM busybox AS fs

WORKDIR /frontend-build
COPY --from=node-builder /src/build/ ./