FROM node:latest as builder

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
RUN pnpm install

COPY . ./
RUN pnpm build

FROM node:latest

RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/dist ./dist

RUN apt-get update; apt-get install curl gnupg -y \
    && curl --location --silent https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install google-chrome-stable -y --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

ARG MFC_USER
ARG MFC_PASSWORD
ENV PUPPETEER_EXECUTABLE_PATH google-chrome-stable
EXPOSE 3000
CMD ["pnpm", "start"]