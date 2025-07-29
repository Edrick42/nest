# Etapa 2: Produção
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma

ENV NODE_ENV=production

# Gera Prisma Client
RUN npx prisma generate

EXPOSE 4000

CMD ["node", "dist/index.js"]
