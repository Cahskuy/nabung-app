FROM oven/bun:alpine

WORKDIR /app

COPY package.json .
COPY bun.lockb .

RUN bun install --production

COPY ./ ./

RUN bunx prisma migrate deploy

ENV ENV=TESTING
ENV APP_PORT=3615
CMD ["bun", "src/index.ts"]

EXPOSE 3615