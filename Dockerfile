# ==========================================
# 1. ETAPA DE CONSTRUCCIÓN (Builder)
# Compila el frontend y descarga librerías pesadas/vulnerables de desarrollo
# ==========================================
FROM node:24-alpine AS builder
WORKDIR /app

# Copia dependencias del frontend y compila
COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# ==========================================
# 2. ETAPA FINAL / PRODUCCIÓN (Runner)
# Imagen limpia y ligera: no arrastra picomatch ni devDependencies
# ==========================================
FROM node:24-alpine AS runner
WORKDIR /app

# Parchea librerías base del sistema Alpine
RUN apk update && apk upgrade --no-cache

# Copia el package.json raíz para poder ejecutar el comando npm run server
COPY package*.json ./

# Instala dependencias del backend (solo producción)
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install --omit=dev --legacy-peer-deps

# Vuelve a la raíz de la app
WORKDIR /app

# Copia el código fuente del backend y los archivos compilados del frontend
COPY server/ ./server
COPY --from=builder /app/dist ./dist

# Expone el puerto y arranca el servicio
EXPOSE 3001
CMD ["npm", "run", "server"]