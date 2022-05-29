FROM node as build
ENV NODE_ENV=production
WORKDIR /app
COPY package.json ./
RUN npm install --production
COPY . .
RUN npm run build

FROM nginx
COPY ./etc/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 3000