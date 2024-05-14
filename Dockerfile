FROM node:20.13-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

# RUN npm run build

EXPOSE 5500

ENV PORT 5500

CMD ["npm", "run" , "start"]