FROM node:20.12.2-slim AS builder
WORKDIR /usr/client
COPY ["./", "."]
RUN npm install
RUN npm run build

FROM nginx AS client
COPY --from=builder /usr/client/index.html /usr/share/nginx/html
COPY --from=builder /usr/client/dist /usr/share/nginx/html/dist