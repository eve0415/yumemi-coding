# For config options, see the README at: https://github.com/devcontainers/templates/tree/main/src/typescript-node
FROM mcr.microsoft.com/devcontainers/typescript-node:1.1.0-22-bookworm

RUN corepack enable pnpm && \
  echo 'store-dir=/home/node/.local/share/pnpm/store/.pnpm-store' >> /usr/local/etc/npmrc && \
  # Remove the global pnpm symlink to avoid conflicts with the corepack-installed version
  rm /usr/local/share/npm-global/bin/pnpm
