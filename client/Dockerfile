FROM node:23 AS base
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install
COPY . .
EXPOSE 3010

# Development stage
FROM base AS dev
CMD ["npm", "run", "dev:docker"]

# Build stage
FROM base AS build
RUN npm run build:docker

# Production stage
# TODO zmenit na alpine
FROM node:23 AS prod
WORKDIR /app
COPY --from=build /app/package.json .
COPY --from=build /app/package-lock.json .
COPY --from=build /app/dist /app/dist
RUN npm install --production
EXPOSE 4173
CMD ["npm", "run", "preview:docker"]
