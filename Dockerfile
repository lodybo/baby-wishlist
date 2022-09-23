# base node image
FROM node:16-bullseye-slim as base

# set for base and all layer that inherit from it
ENV NODE_ENV production

# Install openssl for Prisma
RUN apt-get update && apt-get install -y openssl

# Install all node_modules, including dev dependencies
FROM base as deps

WORKDIR /baby-wishlist

ADD package.json package-lock.json ./
RUN npm install --production=false

# Setup production node_modules
FROM base as production-deps

WORKDIR /baby-wishlist

COPY --from=deps /baby-wishlist/node_modules /baby-wishlist/node_modules
ADD package.json package-lock.json ./
RUN npm prune --production

# Build the app
FROM base as build

WORKDIR /baby-wishlist

COPY --from=deps /baby-wishlist/node_modules /baby-wishlist/node_modules

ADD prisma .
RUN npx prisma generate

ADD . .
RUN npm run build

# Finally, build the production image with minimal footprint
FROM base

WORKDIR /baby-wishlist

COPY --from=production-deps /baby-wishlist/node_modules /baby-wishlist/node_modules
COPY --from=build /baby-wishlist/node_modules/.prisma /baby-wishlist/node_modules/.prisma

COPY --from=build /baby-wishlist/build /baby-wishlist/build
COPY --from=build /baby-wishlist/public /baby-wishlist/public
ADD . .

RUN ln -s /images /baby-wishlist/images

CMD ["npm", "start"]
