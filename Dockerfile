FROM node:latest as builder

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . ./
RUN pnpm build

FROM node:latest

RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
COPY server/nest-cli.json server/tsconfig.json ./server/

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/dist ./dist

ARG DATABASE_URL
ARG MFC_USER
ARG MFC_PASSWORD
EXPOSE 8080
COPY start.sh ./
RUN chmod +x ./start.sh
ENTRYPOINT ["./start.sh"]