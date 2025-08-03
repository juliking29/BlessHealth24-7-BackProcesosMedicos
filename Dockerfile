# Etapa de construcción (build stage)
FROM node:18 AS build

# Establecer el directorio de trabajo en la imagen
WORKDIR /usr/src/app

# Copiar el archivo package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar todo el código fuente del proyecto al contenedor
COPY . .

# Compilar el código TypeScript
RUN npm run build

# Etapa de ejecución (runtime stage)
FROM node:18-slim

# Establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar las dependencias del proyecto desde la etapa de construcción
COPY --from=build /usr/src/app /usr/src/app

# Exponer los puertos para HTTP y HTTPS
EXPOSE 3000 3001

# Establecer la variable de entorno para que el contenedor se ejecute en producción
ENV NODE_ENV=production

# Comando para ejecutar el servidor
CMD ["npm", "start"]
