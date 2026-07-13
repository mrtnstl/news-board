FROM node:22-alpine
WORKDIR /app
COPY package.json package-lock.json ./
COPY services/scraper/package.json services/scraper/tsconfig.json ./services/scraper/
COPY services/scraper/src ./services/scraper/src
COPY packages/shared/package.json packages/shared/tsconfig.json ./packages/shared/
COPY packages/shared/src ./packages/shared/src
COPY packages/contracts/package.json packages/contracts/tsconfig.json ./packages/contracts/
COPY packages/contracts/src ./packages/contracts/src
RUN npm ci
RUN npm run build:contracts && npm run build:shared
CMD ["npm", "--workspace", "services/scraper", "run", "dev"]
