FROM oven/bun:1.2.16
ENV PORT=3000
WORKDIR /src
COPY ./src ./
WORKDIR /src/node
RUN bun install
CMD [ "bun", "start" ]
