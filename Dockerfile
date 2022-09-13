FROM node:14.17.5 as build
COPY . /app
WORKDIR /app
RUN npm install
RUN npx next build 
RUN npx next export 

FROM nginx:stable-perl
COPY --from=build /app/out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
