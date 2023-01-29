FROM node:16.13.0-bullseye-slim as builder

WORKDIR /app

RUN npm install -g pnpm

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY packages/client ./packages/client
COPY packages/server ./packages/server
RUN pnpm install
RUN cd packages/server && npx prisma generate

RUN cd packages/client && pnpm build
RUN cd packages/server && pnpm build
RUN pnpm prune --prod

FROM node:16.13.0-bullseye-slim

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages/client/node_modules ./client/node_modules
COPY --from=builder /app/packages/client/out ./client/out
COPY --from=builder /app/packages/server/node_modules ./server/node_modules
COPY --from=builder /app/packages/server/dist ./server/dist
COPY --from=builder /app/packages/server/package.json ./server/package.json
COPY --from=builder /app/packages/server/prisma ./server/prisma

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
RUN apt-get update && apt-get install curl gnupg -y \
    && curl --location --silent https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install google-chrome-stable -y --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

ARG DATABASE_URL
ARG MFC_USER
ARG MFC_PASSWORD
ENV PUPPETEER_EXECUTABLE_PATH google-chrome-stable
EXPOSE 8080
WORKDIR /server
CMD ["npm", "run", "start:migrate:prod"]