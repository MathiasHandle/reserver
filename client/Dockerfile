FROM node:23 AS base
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3010

FROM base AS dev
CMD ["npm", "run", "dev"]

# Build stage
FROM base AS build
RUN npm run build

# Production stage
# TODO zmenit na alpine
FROM node:23 AS prod
WORKDIR /app
COPY --from=build /app/package.json .
COPY --from=build /app/package-lock.json .
COPY --from=build /app/dist .
RUN npm install --production
EXPOSE 3010
CMD ["npm", "run", "preview"]
