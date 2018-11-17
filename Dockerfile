# escape=`

# ---- Базовый Node ----
FROM node:10.13-jessie AS base
# Создать директорию app
WORKDIR /app

# ---- Зависимости ----
FROM base AS dependencies  
# Используется символ подстановки для копирования как package.json, так и package-lock.json
COPY package*.json ./
# Установить зависимости приложения, включая предназначенные для разработки ('devDependencies')
RUN npm i

# --- Выпуск, используя Alpine ----
FROM node:10.13-alpine AS release  
# Создать директорию app
WORKDIR /app
RUN npm i -g serve nodemon 
COPY --from=dependencies /app/package.json ./

RUN npm i --only=production
COPY --from=build /app ./

CMD ["serve", "-s", "dist", "-p", "1080"]
CMD ["node", "server.js"]