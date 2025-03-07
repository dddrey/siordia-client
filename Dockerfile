FROM node:18

ARG VITE_PRIVATE_API_URL
ENV VITE_PRIVATE_API_URL=$VITE_PRIVATE_API_URL

WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .

RUN npm run build

EXPOSE 8080
CMD ["npm", "run", "preview"]