FROM node:22
RUN corepack enable

WORKDIR /usr/src/app
COPY package.json pnpm-workspace.yaml tsconfig.base.json ./
COPY libs libs
COPY apps/notifier apps/notifier

WORKDIR /usr/src/app/apps/notifier

RUN pnpm i
RUN pnpm build
# EXPOSE 3000
# CMD [ "npm", "run", "start:dev" ]