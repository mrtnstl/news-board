FROM node:22-alpine
WORKDIR /app
COPY package.json package-lock.json ./
COPY services/api/package.json services/api/tsconfig.json ./services/api/
COPY services/api/src ./services/api/src
COPY packages/shared/package.json packages/shared/tsconfig.json ./packages/shared/
COPY packages/shared/src ./packages/shared/src
COPY packages/contracts/package.json packages/contracts/tsconfig.json ./packages/contracts/
COPY packages/contracts/src ./packages/contracts/src
RUN npm ci
RUN npm run build:contracts && npm run build:shared
EXPOSE 3000
CMD ["npm", "--workspace", "services/api", "run", "dev"]
