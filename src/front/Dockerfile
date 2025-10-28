FROM node:18 AS build
WORKDIR /app

COPY ./package.json ./
RUN npm install

COPY . .

ARG BUILD_ENV=production
RUN npm run build -- --configuration=${BUILD_ENV}

FROM nginx:alpine
COPY --from=build /app/dist/front/browser /usr/share/nginx/html
COPY ./nginx .conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
