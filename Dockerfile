FROM node:12.16.2 as builder

WORKDIR '/usr/src/app'

COPY package.json ./

RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

COPY ./ ./

# ENV CHOKIDAR_USEPOLLING=true

RUN npm run build

#nginx base image
FROM nginx 
#builder stage에서 생성된 파일들은 /usr/src/app/build에 들어가는데 이 폴더를 nginx에 넣어준다.
#웹 브라우저에 http 요청이 올때 마다 nginx가 알맞게 표시해준다. 
COPY --from=builder /usr/src/app/build /usr/share/nginx/html