FROM node:22
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /usr/src/app
COPY package.json pnpm-workspace.yaml tsconfig.json ./
COPY libs libs
COPY apps/receiver apps/receiver

WORKDIR /usr/src/app/apps/receiver

RUN pnpm install
RUN pnpm build
# EXPOSE 3000
CMD [ "npm", "run", "start:debug" ]