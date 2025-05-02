FROM node:23

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3020

# Use shell form to allow environment variable substitution
CMD if [ "$NODE_ENV" = "production" ]; then \
        npm run start; \
    else \
        npm run dev; \
    fi