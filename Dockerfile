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

ARG MFC_USER
ARG MFC_PASSWORD
EXPOSE 3000
CMD ["pnpm", "start"]