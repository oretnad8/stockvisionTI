# StockVision TI

StockVision TI es un sistema de gestión de inventario ligero y eficiente diseñado para controlar productos, stock, ubicaciones y categorías. Está construido con un stack moderno y empaquetado con Docker para un despliegue rápido y sencillo.

## 🚀 Tecnologías

*   **Frontend:** React / Vite, TailwindCSS (servido estáticamente).
*   **Backend:** Node.js, Express.
*   **Base de Datos:** SQLite (ligera, basada en archivos).
*   **Despliegue:** Docker, Docker Compose.

## 📋 Requisitos Previos

Si deseas correr el proyecto a través de contenedores (Recomendado para producción):
*   [Docker](https://docs.docker.com/get-docker/)
*   [Docker Compose](https://docs.docker.com/compose/install/)

Si deseas correr el proyecto en modo desarrollo localmente:
*   [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)

## 🛠️ Instalación y Uso (Docker - Recomendado)

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/oretnad8/stockvisionTI.git
   cd stockvisionTI
   ```

2. **Preparar volúmenes locales:**
   Para asegurar la persistencia de la base de datos y de las imágenes cargadas, debes crear los siguientes directorios y darles permisos antes de levantar los contenedores:
   ```bash
   mkdir -p server/uploads
   touch server/database.sqlite
   
   chmod -R 777 server/uploads
   chmod 666 server/database.sqlite
   ```

3. **Construir y levantar el contenedor:**
   ```bash
   docker compose up -d --build
   ```

4. **Acceder a la aplicación:**
   Abre tu navegador web y dirígete a `http://localhost:3001` (o la IP de tu servidor VPS en el puerto 3001).

## 💻 Desarrollo Local (Sin Docker)

Si prefieres trabajar en el código sin usar Docker:

1. **Instalar dependencias del Frontend:**
   ```bash
   npm install
   ```

2. **Instalar dependencias del Backend:**
   ```bash
   cd server
   npm install
   cd ..
   ```

3. **Construir el Frontend:**
   ```bash
   npm run build
   ```

4. **Ejecutar el servidor Backend:**
   ```bash
   cd server
   node index.js
   ```

## 📁 Estructura del Proyecto

```text
stockvisionTI/
├── Dockerfile              # Instrucciones multicapa para compilar y correr la app
├── docker-compose.yml      # Configuración de servicios Docker y volúmenes
├── package.json            # Dependencias y scripts del frontend
├── src/                    # Código fuente del Frontend (React/Vue)
└── server/                 # Directorio del Backend
    ├── index.js            # Punto de entrada de la API Express
    ├── database.sqlite     # Archivo de persistencia de SQLite
    ├── uploads/            # Carpeta para almacenar imágenes subidas
    └── package.json        # Dependencias del Backend
```

## 📝 Especificaciones de Hardware para Servidor (VPS)

Gracias a SQLite y Alpine Linux, este proyecto es extremadamente ligero.
*   **Mínimo:** 1 vCPU, 512 MB RAM.
*   **Recomendado:** 1 vCPU, 1 GB RAM, 10 GB SSD.
*   **Sistemas probados:** Ubuntu Server 22.04 LTS / 24.04 LTS.

---
*Desarrollado para la optimización de procesos de inventario.*
