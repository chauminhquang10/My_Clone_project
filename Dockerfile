FROM node:14.17.5 as build
COPY . /app
WORKDIR /app
RUN npm install
RUN npm run build 

FROM nginx:stable-perl
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
