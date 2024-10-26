FROM node:22
# ENV PNPM_HOME="/pnpm"
# ENV PATH="$PNPM_HOME:$PATH"
# RUN corepack enable

WORKDIR /usr/src/app
COPY package.json pnpm-workspace.yaml tsconfig.json .npmrc ./
COPY libs libs
COPY apps/main apps/main

WORKDIR /usr/src/app/apps/main

RUN npm install pnpm -g && pnpm i
RUN pnpm build
# EXPOSE 3000
CMD [ "npm", "run", "start:debug" ]