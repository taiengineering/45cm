FROM node:22-slim
WORKDIR /app
RUN npm install -g pnpm@9
COPY . .
RUN pnpm install --no-frozen-lockfile
RUN pnpm build:mkt
ENV PORT=3100
EXPOSE 3100
CMD ["node", "start-mkt.js"]