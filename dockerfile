FROM oven/bun:latest

# Install libssl
RUN apt-get update && apt-get install -y libssl-dev

WORKDIR /app
COPY . .

RUN bun install
RUN bunx prisma generate

CMD ["bun", "run", "start"]
